'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import { Themepack } from "@nextspace/types"
import useWorkspace from "@nextspace/useWorkspace"
import { ThemepackLoaderProps } from "./themepackLoader"

export type ThemepackRegisterProps = {
    code: string
    themepack: Themepack
    children?: React.ReactNode
}

export function ThemepackRegister({ code, themepack, children }: ThemepackRegisterProps) {
    const workspace = useWorkspace();

    if (code && themepack) {
        workspace.registerThemepack(code, themepack)
    }

    return children
}

export function themepackRegister(themepack: Themepack) {
    return function ThemepackLoaderComp({ code, children }: ThemepackLoaderProps) {
        return <ThemepackRegister code={code} themepack={themepack} >{children}</ThemepackRegister>
    }
}

export default themepackRegister