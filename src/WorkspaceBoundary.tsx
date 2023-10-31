'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */
import clsx from "clsx"
import { Suspense, useContext, useMemo, useState } from "react"
import Modal from "./components/Modal"
import { TranslationLoaderComponent, TranslationLoaderProps } from "./components/translationLoader"
import WorkspaceHolder from "./contexts/workspace"
import styles from "./nextspace.module.scss"
import { I18n, Process, Workspace, WorkspaceConfig } from "./types"
import SimpleTranslationHolder from "./utils/SimpleTranslationHolder"
import SimpleProgressIndicator from "./utils/SimpleProgressIndicator"
import './global.scss'
import { sequential } from "./utils/process"

let defaultConfig: Required<WorkspaceConfig> = {
    translationHolder: new SimpleTranslationHolder(),
    progressIndicator: new SimpleProgressIndicator()
}

export function setDefaultConfig(config: WorkspaceConfig) {
    defaultConfig = Object.assign({}, defaultConfig, config)
}

export type WorkspaceBoundaryProps = {
    children: React.ReactNode
    className?: string
    defaultLocale?: string
    translations?: TranslationLoaderComponent<React.ComponentType<TranslationLoaderProps>>[]
    config?: WorkspaceConfig
}


function assertTranslation(locale: string | undefined,
    translations: TranslationLoaderComponent<React.ComponentType<TranslationLoaderProps>>[]) {
    if (locale) {
        const translation = translations.find((t) => t.locale === locale)
        if (!translation) {
            throw `No ${locale} found in translations [${translations.join(",")}]`
        }
        return translation
    }
}

export default function WorkspaceBoundary(props: WorkspaceBoundaryProps) {
    const { children, className, defaultLocale = "", translations = [] } = props
    let { config = {} } = props

    const mergedConfig = Object.assign({}, defaultConfig, config) as Required<WorkspaceConfig>

    //check defaultLocal in translations
    assertTranslation(defaultLocale, translations)

    const [locale, setLocale] = useState(defaultLocale || translations.find(t => true)?.locale || '')
    // const [refresh, setRefresh] = useState(0);
    // const _refresh = function () {
    //     setRefresh(refresh + 1);
    // }

    const { translationHolder, progressIndicator } = mergedConfig
    translationHolder.change(locale)

    const workspace = useMemo(() => {
        //i18n
        const translationLocales = translations && translations.map((t) => t.locale) || []
        const i18n: I18n = {
            locale,
            l: (key, args) => {
                return translationHolder.label(key, args) || key
            },

        }
        const changeLocale = (newLocale: string) => {
            const loader = assertTranslation(newLocale, translations)
            const lstatus = loader?._nextspace._status || 0

            if (locale === newLocale) {
                return
            }
            if (lstatus > 0 || !loader) {
                //loaded, change locale directly
                translationHolder.change(newLocale)
                setLocale(newLocale)
            } else {
                progressIndicator.start()
                loader.preload().then(() => {
                    translationHolder.change(newLocale)
                    setLocale(newLocale)
                }).finally(() => {
                    progressIndicator.end()
                })

            }
        }

        //process
        const withProcessIndicator = (...processes: Process[]) => {
            progressIndicator.start()
            return sequential(...processes).finally(() => {
                progressIndicator.end()
            })
        }
        const workspace: Workspace = {
            locales: translationLocales,
            changeLocale: changeLocale,
            registerTranslation: (locale, translation) => {
                translationHolder.register(locale, translation)
            },
            i18n,
            progressIndicator,
            withProcessIndicator
        }
        return workspace
    }, [locale, translations, translationHolder, progressIndicator])

    const TransationLoader = assertTranslation(locale, translations)

    return <div className={clsx(styles.workspace, className)}>
        <WorkspaceHolder.Provider value={workspace}>
            <Suspense fallback={
                <Modal>
                    <p>Loading</p>
                </Modal>}>
                {TransationLoader ? <TransationLoader locale={locale}>{children}</TransationLoader> : children}
            </Suspense>
        </WorkspaceHolder.Provider>
    </div>
}

