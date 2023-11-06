'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { Suspense, useMemo, useState } from "react"
import Modal from "./components/Modal"
import { ThemepackLoaderComponent, ThemepackLoaderProps } from "./components/themepackLoader"
import { TranslationLoaderComponent, TranslationLoaderProps } from "./components/translationLoader"
import WorkspaceHolder from "./contexts/workspace"
import './global.scss'
import { I18n, Process, Themepack, Workspace, WorkspaceConfig } from "./types"
import SimpleProgressIndicator from "./utils/SimpleProgressIndicator"
import SimpleThemepackHolder from "./utils/SimpleThemepackHolder"
import SimpleTranslationHolder from "./utils/SimpleTranslationHolder"
import { sequential } from "./utils/process"

let defaultConfig: Required<WorkspaceConfig> = {
    translationHolder: new SimpleTranslationHolder(),
    progressIndicator: new SimpleProgressIndicator(),
    themepackHolder: new SimpleThemepackHolder()
}

export function setDefaultConfig(config: WorkspaceConfig) {
    defaultConfig = Object.assign({}, defaultConfig, config)
}

export type WorkspaceBoundaryProps = {
    children?: React.ReactNode
    defaultLanguage?: string
    defaultTheme?: string
    translations?: TranslationLoaderComponent<React.ComponentType<TranslationLoaderProps>>[]
    themepacks?: ThemepackLoaderComponent<React.ComponentType<ThemepackLoaderProps>>[]
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

function assertThemepack(theme: string | undefined,
    themepacks: ThemepackLoaderComponent<React.ComponentType<ThemepackLoaderProps>>[]) {
    if (theme) {
        const themepack = themepacks.find((t) => t.theme === theme)
        if (!themepack) {
            throw `No ${theme} found in themepack [${themepacks.map((t) => t.theme).join(",")}]`
        }
        return themepack
    }
}

export default function WorkspaceBoundary(props: WorkspaceBoundaryProps) {
    const { children, defaultLanguage = "", translations = [], defaultTheme = "", themepacks = [] } = props
    let { config = {} } = props

    const mergedConfig = Object.assign({}, defaultConfig, config) as Required<WorkspaceConfig>

    //check defaultLocal in translations
    assertTranslation(defaultLanguage, translations)
    //check defaultTheme in thempacks
    assertThemepack(defaultTheme, themepacks)

    const [language, setLanguage] = useState(defaultLanguage || translations.find(t => true)?.language || '')
    const [theme, setTheme] = useState(defaultTheme || themepacks.find(t => true)?.theme || '')
    // const [refresh, setRefresh] = useState(0);
    // const _refresh = function () {
    //     setRefresh(refresh + 1);
    // }

    const { translationHolder, themepackHolder, progressIndicator } = mergedConfig
    translationHolder.change(language)
    themepackHolder.change(theme)

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

        //theme
        const themes = themepacks && themepacks.map((t) => t.theme) || []
        const themepack = new Proxy({} as Themepack, {
            ownKeys(target) {
                return Reflect.ownKeys(themepackHolder.get())
            },
            get: function (target, prop, receiver) {
                return Reflect.get(themepackHolder.get(), prop, receiver)
            },
        })

        const changeTheme = (nextTheme: string) => {
            const loader = assertThemepack(nextTheme, themepacks)
            const lstatus = loader?._nextspace._status || 0

            if (theme === nextTheme) {
                return
            }
            if (lstatus > 0 || !loader) {
                //loaded, change theme directly
                themepackHolder.change(nextTheme)
                setTheme(nextTheme)
            } else {
                progressIndicator.start()
                loader.preload().then(() => {
                    themepackHolder.change(nextTheme)
                    setTheme(nextTheme)
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
            //i18n
            languages: translationLanguages,
            changeLanguage,
            registerTranslation: (language, translation) => {
                translationHolder.register(language, translation)
            },
            i18n,

            //theme
            themes,
            changeTheme,
            registerThemepack: (theme, themepack) => {
                themepackHolder.register(theme, themepack)
            },
            themepack,

            //progress
            progressIndicator,
            withProcessIndicator
        }
        return workspace
    }, [language, translations, translationHolder, theme, themepacks, themepackHolder, progressIndicator])

    const TransationLoader = assertTranslation(language, translations)
    const ThemepackLoader = assertThemepack(theme, themepacks)

    const themepackBoundary = (children: React.ReactNode) => {
        return ThemepackLoader ? <ThemepackLoader theme={theme}>
            {children}
        </ThemepackLoader> : children
    }
    const translationBoundary = (children: React.ReactNode) => {
        return TransationLoader ? <TransationLoader language={language}>
            {children}
        </TransationLoader> : children
    }

    const loaderBoundary = (children: React.ReactNode) => {
        //three node inner -> outer
        return themepackBoundary(translationBoundary(children))
    }

    return <WorkspaceHolder.Provider value={workspace}>
        <Suspense fallback={
            <Modal>
                <p>Loading...</p>
            </Modal>}>
            {loaderBoundary(children)}
        </Suspense>
    </WorkspaceHolder.Provider>
}

