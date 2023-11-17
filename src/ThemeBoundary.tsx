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

let defaultConfig: Required<ThemeConfig> = {
    themepackHolder: new SimpleThemepackHolder()
}

export function setDefaultConfig(config: ThemeConfig) {
    defaultConfig = Object.assign({}, defaultConfig, config)
}

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
        defaultTheme: defaultThemeCode = "", themepackLoaders = []
        , config = {} } = props

    const workspace = useWorkspace()

    const mergedConfig = Object.assign({}, defaultConfig, config) as Required<ThemeConfig>

    //check defaultTheme in loaders
    assertThemepack(defaultThemeCode, themepackLoaders)

    const [themeCode, setThemeCode] = useState(defaultThemeCode || themepackLoaders.find(t => true)?.code || '')

    const { themepackHolder } = mergedConfig
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
                    workspace?.progressIndicator.end()
                })

            }
        }

        const theme: Theme = {
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
