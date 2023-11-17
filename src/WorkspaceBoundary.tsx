'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import clsx from "clsx"
import { CSSProperties, useMemo } from "react"
import I18nBoundary from "./I18nBoundary"
import ThemeBoundary from "./ThemeBoundary"
import { ThemepackLoaderComponent, ThemepackLoaderProps } from "./components/themepackLoader"
import { TranslationLoader, TranslationLoaderProps } from "./components/translationLoader"
import WorkspaceHolder from "./contexts/workspace"
import './global.scss'
import nextspaceStyles from "./nextspace.module.scss"
import { Process, Workspace, WorkspaceConfig } from "./types"
import useTheme from "./useTheme"
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
    translationLoaders?: TranslationLoader<React.ComponentType<TranslationLoaderProps>>[]
    themepackLoaders?: ThemepackLoaderComponent<React.ComponentType<ThemepackLoaderProps>>[]
    config?: WorkspaceConfig
    className?: string
    style?: CSSProperties
}

export default function WorkspaceBoundary(props: WorkspaceBoundaryProps) {
    const { children, className, style,
        defaultLanguage = "", translationLoaders = [],
        defaultTheme = "", themepackLoaders = []
        , config = {} } = props

    const mergedConfig = Object.assign({}, defaultConfig, config) as Required<WorkspaceConfig>

    const { progressIndicator } = mergedConfig

    const workspace = useMemo(() => {
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
            //progress
            progressIndicator,
            withProcessIndicator
        }
        return workspace
    }, [progressIndicator])


    const themeBoundary = (children: React.ReactNode) => {
        return <ThemeBoundary defaultTheme={defaultTheme} themepackLoaders={themepackLoaders} config={mergedConfig} >
            {children}
        </ThemeBoundary>
    }
    const i18nBoundary = (children: React.ReactNode) => {
        return <I18nBoundary defaultLanguage={defaultLanguage} translationLoaders={translationLoaders} config={mergedConfig} >
            {children}
        </I18nBoundary>
    }

    const boundaries = (children: React.ReactNode) => {
        return i18nBoundary(themeBoundary(children))
    }

    return <WorkspaceHolder.Provider value={workspace}>
        {boundaries(<Workspace className={className} style={style}>{children}</Workspace>)}
    </WorkspaceHolder.Provider>
}

// a internal component to apply colorScheme in WorkspaceContext
function Workspace({ className, style, children }: { className?: string, style?: CSSProperties, children: React.ReactNode }) {
    const theme = useTheme()
    const colorScheme = theme?.themepack?.colorScheme
    style = (style || colorScheme) ? Object.assign({}, style, colorScheme && { colorScheme }) : undefined
    return <div data-nextspace-root="" className={clsx(nextspaceStyles.workspace, className)} style={style}>{children}</div>
}

