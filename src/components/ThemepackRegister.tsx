'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import { Themepack } from "@nextspace/types"
import useWorkspace from "@nextspace/useWorkspace"

export type TranslationRegisterProps = {
    theme: string
    themepack: Themepack
    children?: React.ReactNode
}

export default function ThemepackRegister({ theme, themepack, children }: TranslationRegisterProps) {
    const workspace = useWorkspace();

    if (theme && themepack) {
        workspace.registerThemepack(theme, themepack)
    }

    return children
}