'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import { Themepack } from "@nextspace/types"
import useWorkspace from "@nextspace/useWorkspace"

export type TranslationRegisterProps = {
    code: string
    themepack: Themepack
    children?: React.ReactNode
}

export default function ThemepackRegister({ code, themepack, children }: TranslationRegisterProps) {
    const workspace = useWorkspace();

    if (code && themepack) {
        workspace.registerThemepack(code, themepack)
    }

    return children
}