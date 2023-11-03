'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import WorkspaceHolder from "@nextspace/contexts/workspace"
import { useContext } from "react"

export type TranslationRegisterProps = {
    language: string
    translation: { [key: string]: any }
    children?: React.ReactNode
}

export default function TranslationRegister({ language, translation, children }: TranslationRegisterProps) {
    const workspace = useContext(WorkspaceHolder)

    if (language && translation) {
        workspace.registerTranslation(language, translation)
    }

    return children
}