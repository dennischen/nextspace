'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { Suspense, useMemo, useState } from "react"
import Modal from "./components/Modal"
import { TranslationLoaderComponent, TranslationLoaderProps } from "./components/translationLoader"
import WorkspaceHolder from "./contexts/workspace"
import './global.scss'
import { I18n, Process, Workspace, WorkspaceConfig } from "./types"
import SimpleProgressIndicator from "./utils/SimpleProgressIndicator"
import SimpleTranslationHolder from "./utils/SimpleTranslationHolder"
import { sequential } from "./utils/process"

let defaultConfig: Required<WorkspaceConfig> = {
    translationHolder: new SimpleTranslationHolder(),
    progressIndicator: new SimpleProgressIndicator()
}

export function setDefaultConfig(config: WorkspaceConfig) {
    defaultConfig = Object.assign({}, defaultConfig, config)
}

export type WorkspaceBoundaryProps = {
    children?: React.ReactNode
    defaultLanguage?: string
    translations?: TranslationLoaderComponent<React.ComponentType<TranslationLoaderProps>>[]
    config?: WorkspaceConfig
}


function assertTranslation(language: string | undefined,
    translations: TranslationLoaderComponent<React.ComponentType<TranslationLoaderProps>>[]) {
    if (language) {
        const translation = translations.find((t) => t.language === language)
        if (!translation) {
            throw `No ${language} found in translations [${translations.join(",")}]`
        }
        return translation
    }
}

export default function WorkspaceBoundary(props: WorkspaceBoundaryProps) {
    const { children, defaultLanguage: defaultLanguage = "", translations = [] } = props
    let { config = {} } = props

    const mergedConfig = Object.assign({}, defaultConfig, config) as Required<WorkspaceConfig>

    //check defaultLocal in translations
    assertTranslation(defaultLanguage, translations)

    const [language, setLanguage] = useState(defaultLanguage || translations.find(t => true)?.language || '')
    // const [refresh, setRefresh] = useState(0);
    // const _refresh = function () {
    //     setRefresh(refresh + 1);
    // }

    const { translationHolder, progressIndicator } = mergedConfig
    translationHolder.change(language)

    const workspace = useMemo(() => {
        //i18n
        const translationLanguages = translations && translations.map((t) => t.language) || []
        const i18n: I18n = {
            language: language,
            l: (key, args) => {
                return translationHolder.label(key, args) || key
            },

        }
        const changeLanguage = (nextLanguage: string) => {
            const loader = assertTranslation(nextLanguage, translations)
            const lstatus = loader?._nextspace._status || 0

            if (language === nextLanguage) {
                return
            }
            if (lstatus > 0 || !loader) {
                //loaded, change language directly
                translationHolder.change(nextLanguage)
                setLanguage(nextLanguage)
            } else {
                progressIndicator.start()
                loader.preload().then(() => {
                    translationHolder.change(nextLanguage)
                    setLanguage(nextLanguage)
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
            languages: translationLanguages,
            changeLanguage: changeLanguage,
            registerTranslation: (language, translation) => {
                translationHolder.register(language, translation)
            },
            i18n,
            progressIndicator,
            withProcessIndicator
        }
        return workspace
    }, [language, translations, translationHolder, progressIndicator])

    const TransationLoader = assertTranslation(language, translations)

    return <WorkspaceHolder.Provider value={workspace}>
        <Suspense fallback={
            <Modal>
                <p>Loading</p>
            </Modal>}>
            {TransationLoader ? <TransationLoader language={language}>{children}</TransationLoader> : children}
        </Suspense>
    </WorkspaceHolder.Provider>
}

