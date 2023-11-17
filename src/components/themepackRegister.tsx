'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import { Themepack } from "@nextspace/types"
import useTheme from "@nextspace/useTheme"
import { ThemepackLoaderProps } from "./themepackLoader"

export type ThemepackRegisterProps = {
    code: string
    themepack: Themepack
    children?: React.ReactNode
}

export function ThemepackRegister({ code, themepack, children }: ThemepackRegisterProps) {
    const theme = useTheme()

    if (code && themepack) {
        theme._registerThemepack(code, themepack)
    }

    return children
}

export function themepackRegister(themepack: Themepack) {
    return function ThemepackLoader({ code, children }: ThemepackLoaderProps) {
        return <ThemepackRegister code={code} themepack={themepack} >{children}</ThemepackRegister>
    }
}

export default themepackRegister