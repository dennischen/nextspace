'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import clsx from "clsx"
import { CSSProperties, useContext, useMemo, useState } from "react"
import { ThemepackLoaderComponent, ThemepackLoaderProps } from "./components/themepackLoader"
import { TranslationLoaderComponent, TranslationLoaderProps } from "./components/translationLoader"
import WorkspaceHolder from "./contexts/workspace"
import './global.scss'
import nextspaceStyles from "./nextspace.module.scss"
import { I18n, Process, Theme, Themepack, Workspace, WorkspaceConfig } from "./types"
import SimpleProgressIndicator from "./utils/SimpleProgressIndicator"
import SimpleThemepackHolder from "./utils/SimpleThemepackHolder"
import SimpleTranslationHolder from "./utils/SimpleTranslationHolder"
import { sequential } from "./utils/process"
import useWorkspace from "./useWorkspace"

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
    translationLoaders?: TranslationLoaderComponent<React.ComponentType<TranslationLoaderProps>>[]
    themepackLoaders?: ThemepackLoaderComponent<React.ComponentType<ThemepackLoaderProps>>[]
    config?: WorkspaceConfig
    className?: string
    style?: CSSProperties
}


function assertTranslation(language: string | undefined,
    loaders: TranslationLoaderComponent<React.ComponentType<TranslationLoaderProps>>[]) {
    if (language) {
        const translation = loaders.find((t) => t.language === language)
        if (!translation) {
            throw `No ${language} found in translations [${loaders.join(",")}]`
        }
        return translation
    }
}

function assertThemepack(code: string | undefined,
    loaders: ThemepackLoaderComponent<React.ComponentType<ThemepackLoaderProps>>[]) {
    if (code) {
        const themepack = loaders.find((t) => t.code === code)
        if (!themepack) {
            throw `No ${code} found in themepacks [${loaders.map((t) => t.code).join(",")}]`
        }
        return themepack
    }
}

export default function WorkspaceBoundary(props: WorkspaceBoundaryProps) {
    const { children, className, style,
        defaultLanguage = "", translationLoaders = [],
        defaultTheme: defaultThemeCode = "", themepackLoaders = []
        , config = {} } = props

    const mergedConfig = Object.assign({}, defaultConfig, config) as Required<WorkspaceConfig>

    //check defaultLocal in loaders
    assertTranslation(defaultLanguage, translationLoaders)
    //check defaultTheme in loaders
    assertThemepack(defaultThemeCode, themepackLoaders)

    const [language, setLanguage] = useState(defaultLanguage || translationLoaders.find(t => true)?.language || '')
    const [themeCode, setThemeCode] = useState(defaultThemeCode || themepackLoaders.find(t => true)?.code || '')
    // const [refresh, setRefresh] = useState(0);
    // const _refresh = function () {
    //     setRefresh(refresh + 1);
    // }

    const { translationHolder, themepackHolder, progressIndicator } = mergedConfig
    translationHolder.change(language)
    themepackHolder.change(themeCode)

    const workspace = useMemo(() => {
        //i18n
        const translationLanguages = translationLoaders && translationLoaders.map((t) => t.language) || []
        const changeLanguage = (nextLanguage: string) => {
            const loader = assertTranslation(nextLanguage, translationLoaders)
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
        const i18n: I18n = {
            languages: translationLanguages,
            language,
            changeLanguage,
            l: (key, args) => {
                return translationHolder.label(key, args) || key
            },

        }


        //theme
        const themeCodes = themepackLoaders && themepackLoaders.map((t) => t.code) || []
        const themepack = new Proxy({} as Themepack, {
            ownKeys(target) {
                return Reflect.ownKeys(themepackHolder.get())
            },
            get: function (target, prop, receiver) {
                return Reflect.get(themepackHolder.get(), prop, receiver)
            },
        })

        const changeTheme = (code: string) => {
            const loader = assertThemepack(code, themepackLoaders)
            const lstatus = loader?._nextspace._status || 0

            if (themeCode === code) {
                return
            }
            if (lstatus > 0 || !loader) {
                //loaded, change theme directly
                themepackHolder.change(code)
                setThemeCode(code)
            } else {
                progressIndicator.start()
                loader.preload().then(() => {
                    themepackHolder.change(code)
                    setThemeCode(code)
                }).finally(() => {
                    progressIndicator.end()
                })

            }
        }

        const theme: Theme = {
            codes: themeCodes,
            code: themeCode,
            themepack,
            changeTheme,
        }

        //process
        const withProcessIndicator = <P, T>(processes: Process<P, T> | Process<P, T>[], initValue?: P) => {
            progressIndicator.start()
            const o = sequential(Array.isArray(processes) ? processes : [processes], initValue)
            //catch/eat this handle path to end indicator
            o.catch(() => { }).finally(() => {
                progressIndicator.end()
            })
            //return original so call can catch it
            return o
        }
        const workspace: Workspace = {
            //i18n
            registerTranslation: (language, translation) => {
                translationHolder.register(language, translation)
            },
            i18n,

            //theme
            registerThemepack: (code, themepack) => {
                themepackHolder.register(code, themepack)
            },
            theme,

            //progress
            progressIndicator,
            withProcessIndicator
        }
        return workspace
    }, [language, translationLoaders, translationHolder, themeCode, themepackLoaders, themepackHolder, progressIndicator])

    const TransationLoader = assertTranslation(language, translationLoaders)
    const ThemepackLoader = assertThemepack(themeCode, themepackLoaders)

    const themepackBoundary = (children: React.ReactNode) => {
        return ThemepackLoader ? <ThemepackLoader code={themeCode}>
            {children}
        </ThemepackLoader> : children
    }
    const translationBoundary = (children: React.ReactNode) => {
        return TransationLoader ? <TransationLoader language={language}>
            {children}
        </TransationLoader> : children
    }

    const loaderBoundary = (children: React.ReactNode) => {
        return translationBoundary(themepackBoundary(children))
    }

    return <WorkspaceHolder.Provider value={workspace}>
        {loaderBoundary(<Workspace className={className} style={style}>{children}</Workspace>)}
    </WorkspaceHolder.Provider>
}

// a internal component to apply colorScheme in WorkspaceContext
function Workspace({ className, style, children }: { className?: string, style?: CSSProperties, children: React.ReactNode }) {
    const workspace = useWorkspace()
    const colorScheme = workspace.theme?.themepack?.colorScheme
    style = (style || colorScheme) ? Object.assign({}, style, colorScheme && { colorScheme }) : undefined
    return <div data-nextspace-root="" className={clsx(nextspaceStyles.workspace, className)} style={style}>{children}</div>
}

