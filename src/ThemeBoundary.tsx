'use client'
/*
 * @file-created: 2023-11-17
 * @author: Dennis Chen
 */

import { useMemo, useState } from "react"
import { ThemepackLoaderComponent, ThemepackLoaderProps } from "./components/themepackLoader"
import ThemeHolder from "./contexts/theme"
import './global.scss'
import { Theme, ThemeConfig, Themepack } from "./types"
import useWorkspace from "./useWorkspace"
import SimpleThemepackHolder from "./utils/SimpleThemepackHolder"
import { _Theme } from "./_types"
import { EMPTY_ARRAY, EMPTY_OBJECT } from "./constants"


export type ThemeBoundaryProps = {
    children?: React.ReactNode
    defaultTheme?: string
    themepackLoaders?: ThemepackLoaderComponent<React.ComponentType<ThemepackLoaderProps>>[]
    config?: ThemeConfig
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

export default function ThemeBoundary(props: ThemeBoundaryProps) {
    const { children,
        defaultTheme: defaultThemeCode = "", themepackLoaders = EMPTY_ARRAY
        , config = EMPTY_OBJECT as ThemeConfig } = props

    const workspace = useWorkspace()

    const themepackHolder = useMemo(() => {
        return config.themepackHolder || new SimpleThemepackHolder()
    }, [config])

    //check defaultTheme in loaders
    assertThemepack(themepackHolder.code, themepackLoaders)
    assertThemepack(defaultThemeCode, themepackLoaders)

    const [themeCode, setThemeCode] = useState(themepackHolder.code || defaultThemeCode || themepackLoaders.find(t => true)?.code || '')

    themepackHolder.change(themeCode)

    const theme = useMemo(() => {
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
                workspace?.progressIndicator.start()
                loader.preload().then(() => {
                    themepackHolder.change(code)
                    setThemeCode(code)
                }).finally(() => {
                    workspace?.progressIndicator.stop()
                })

            }
        }

        const theme: Theme & _Theme = {
            codes: themeCodes,
            code: themeCode,
            themepack,
            changeTheme,
            _registerThemepack: (code, themepack) => {
                themepackHolder.register(code, themepack)
            }
        }

        return theme
    }, [themeCode, themepackLoaders, themepackHolder, workspace])

    const ThemepackLoader = assertThemepack(themeCode, themepackLoaders)

    return <ThemeHolder.Provider value={theme}>
        {ThemepackLoader ? <ThemepackLoader code={themeCode}>
            {children}
        </ThemepackLoader> : children}
    </ThemeHolder.Provider>
}
