'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import WorkspaceHolder from "@nextspace/contexts/workspace"
import { Themepack } from "@nextspace/types"
import { useContext } from "react"

export type TranslationRegisterProps = {
    theme: string
    themepack: Themepack
    children?: React.ReactNode
}

export default function TranslationRegister({ theme, themepack, children }: TranslationRegisterProps) {
    const workspace = useContext(WorkspaceHolder)

    if (theme && themepack) {
        workspace.registerThemepack(theme, themepack)
    }

    return children
}