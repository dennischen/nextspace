'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import spin from '@nextspace/assets/spin.svg'
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { CSSProperties, Fragment, Suspense, forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react"
import I18nBoundary from "./I18nBoundary"
import ThemeBoundary from "./ThemeBoundary"
import { _Workspace } from "./_types"
import Modal from "./components/Modal"
import { ThemepackLoaderComponent, ThemepackLoaderProps } from "./components/themepackLoader"
import { TranslationLoader, TranslationLoaderProps } from "./components/translationLoader"
import { CLASS_NAME_SPIN, EVENT_ON_ROUTE } from "./constants"
import WorkspaceHolder from "./contexts/workspace"
import './global.scss'
import nextspaceStyles from "./nextspace.module.scss"
import { Process, ProgressIndicator, Store, Workspace, WorkspaceConfig, WorkspaceListener } from "./types"
import useTheme from "./useTheme"
import useWorkspace from './useWorkspace'
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
    envVariables?: { readonly [key: string]: string | undefined }
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

    const routingDetectorRef = useRef<RoutingDetectorRef>(null)

    const storeMap: Map<string, Store<any>> = useMemo(() => {
        return new Map()
    }, [])

    const listeners: WorkspaceListener[] = useMemo(() => {
        return []
    }, [])

    const workspace = useMemo(() => {

        //stores
        type GetStore<S> = {
            <S,>(name: string): Store<S> | undefined
            (name: string, init: (() => Store<S>)): Store<S>
        }
        const getStore = (<S,>(name: string, init?: Store<S> | (() => Store<S>)) => {
            let store = storeMap.get(name)
            if (store) {
                return store
            }
            store = init ? (typeof init === 'function' ? init() : init) : undefined
            if (store) {
                storeMap.set(name, store)
            }
            return store
        }) as GetStore<any>

        const removeStore = <S,>(name: string) => {
            const store = storeMap.get(name)
            store && storeMap.delete(name)
            return store
        }

        //subscribe & emit
        const subscribe = (listener: WorkspaceListener) => {
            listeners.push(listener)
            return () => {
                let i = listeners.lastIndexOf(listener)
                if (i >= 0) {
                    listeners.splice(i, 1)
                }
            }
        }
        const emit = (eventName: string, eventData: any) => {
            listeners.forEach((l) => {
                l(eventName, eventData)
            })
        }


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
            routingDetectorRef.current?.notifyRouting(path)
        }

        const workspace: Workspace & _Workspace = {
            envVariables,
            getStore,
            removeStore,
            subscribe,
            emit,
            progressIndicator,
            withProcessIndicator,
            _notifyRouting
        }
        return workspace
    }, [progressIndicator, envVariables, storeMap, listeners])


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
    const fallbackComp = fallback && (typeof fallback === 'boolean' ? <Modal><img alt='loading' className={CLASS_NAME_SPIN} src={spin.src} /></Modal> : fallback)

    const boundaries = (children: React.ReactNode) => {
        const bo = i18nBoundary(themeBoundary(children))
        if (fallbackComp) {
            return <Suspense fallback={fallbackComp}>{bo}</Suspense>
        } else {
            return bo
        }
    }

    return <WorkspaceHolder.Provider value={workspace}>
        <RoutingDetector ref={routingDetectorRef} progressIndicator={progressIndicator} />
        {boundaries(<Workspace className={className} style={style}>
            {children}
        </Workspace>)}
    </WorkspaceHolder.Provider>
}

// a internal component to apply colorScheme in WorkspaceContext
function Workspace({ className, style, children }: { className?: string, style?: CSSProperties, children: React.ReactNode }) {
    const theme = useTheme()
    const colorScheme = theme?.themepack?.colorScheme
    style = (style || colorScheme) ? Object.assign({}, style, colorScheme && { colorScheme }) : undefined
    return <div data-nextspace-root="" className={clsx(nextspaceStyles.workspace, className)} style={style}>{children}</div>
}

// a internal component to handle pathname routing to prevent whole workspace reload
type RoutingDetectorRef = {
    notifyRouting: (path: string) => void
}
type RoutingDetectorProps = {
    progressIndicator: ProgressIndicator
}

const RoutingDetector = forwardRef<RoutingDetectorRef, RoutingDetectorProps>(function RouteDetector({ progressIndicator }, ref) {
    const workspace = useWorkspace()
    const pathname = usePathname()
    const routings = useMemo(() => {
        return new Set<string>()
    }, [])

    useImperativeHandle(ref, () => {
        return {
            pathname,
            notifyRouting: (path: string) => {
                if (pathname === path) {
                    //user route back to current page, reset all previous routing
                    routings.forEach(() => {
                        progressIndicator.stop()
                    })
                    routings.clear()
                } else if (!routings.has(path)) {
                    //prvent notify same n time by user clicking when loading
                    routings.add(path)
                    progressIndicator.start()
                }
            }
        }
    }, [pathname, routings, progressIndicator])

    useEffect(function () {
        //page are rerouted, decrease all counter
        routings.forEach(() => {
            progressIndicator.stop()
        })
        routings.clear()
    }, [pathname, routings, progressIndicator])

    //emit when pathname changing
    useEffect(function () {
        workspace.emit(EVENT_ON_ROUTE, { pathname })
    }, [workspace, pathname])
    return <Fragment />
})
