'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import spin from '@nextspace/assets/spin.svg'
import clsx from "clsx"
import { usePathname, useSearchParams } from "next/navigation"
import { CSSProperties, Suspense, useEffect, useMemo } from "react"
import I18nBoundary from "./I18nBoundary"
import ThemeBoundary from "./ThemeBoundary"
import { _Workspace } from "./_types"
import Modal from "./components/Modal"
import { ThemepackLoaderComponent, ThemepackLoaderProps } from "./components/themepackLoader"
import { TranslationLoader, TranslationLoaderProps } from "./components/translationLoader"
import { SPIN_CLASS_NAME } from "./constants"
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
    envVariables?: { readonly [key: string]: string | undefined}
    config?: WorkspaceConfig
    className?: string
    style?: CSSProperties
    fallback?: React.ReactNode
}

export default function WorkspaceBoundary(props: WorkspaceBoundaryProps) {
    const { children, className, style,
        defaultLanguage = "", translationLoaders = [],
        defaultTheme = "", themepackLoaders = [],
        fallback = true, envVariables = {}
        , config = {} } = props

    const mergedConfig = Object.assign({}, defaultConfig, config) as Required<WorkspaceConfig>

    const { progressIndicator } = mergedConfig

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currPath = pathname + (searchParams?.size > 0 ? ('?' + searchParams) : '')

    //routing
    const notifyRoutings = useMemo(() => {
        return new Set<string>()
    }, [])
    useEffect(function () {
        //page are rerouted, decrease all counter
        notifyRoutings.forEach(() => {
            progressIndicator.stop()
        })
        notifyRoutings.clear()
    }, [pathname, searchParams, notifyRoutings, progressIndicator])

    const workspace = useMemo(() => {
        //process
        const withProcessIndicator = <P, T>(processes: Process<P, T> | Process<P, T>[], initValue?: P) => {
            progressIndicator.start()
            const o = sequential(Array.isArray(processes) ? processes : [processes], initValue)
            //catch/eat this handle path to end indicator
            o.catch(() => { }).finally(() => {
                progressIndicator.stop()
            })
            //return original so call can catch it
            return o
        }

        //routing
        const _notifyRouting = (path: string) => {

            if (currPath === path) {
                //user route back to current page, reset all previous routing
                notifyRoutings.forEach(() => {
                    progressIndicator.stop()
                })
                notifyRoutings.clear()
            } else if (!notifyRoutings.has(path)) {
                //prvent notify same n time by user clicking when loading
                notifyRoutings.add(path)
                progressIndicator.start()
            }
        }

        const workspace: Workspace & _Workspace = {
            envVariables,
            //progress
            progressIndicator,
            withProcessIndicator,
            _notifyRouting
        }
        return workspace
    }, [progressIndicator, notifyRoutings, currPath])


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

    /* eslint-disable-next-line @next/next/no-img-element */
    const fallbackComp = fallback && (typeof fallback === 'boolean' ? <Modal><img alt='loading' className={SPIN_CLASS_NAME} src={spin.src} /></Modal> : fallback)

    const boundaries = (children: React.ReactNode) => {
        const bo = i18nBoundary(themeBoundary(children))
        if (fallbackComp) {
            return <Suspense fallback={fallbackComp}>{bo}</Suspense>
        } else {
            return bo
        }
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

