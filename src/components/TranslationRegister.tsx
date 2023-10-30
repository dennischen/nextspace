'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import WorkspaceHolder from "@nextspace/contexts/workspace"
import { useContext } from "react"

export type TranslationRegisterProps = {
    locale: string
    translation: { [key: string]: any }
    children?: React.ReactNode
}

export default function TranslationRegister({ locale, translation, children }: TranslationRegisterProps) {
    const workspace = useContext(WorkspaceHolder)

    if (locale && translation) {
        workspace.registerTranslation(locale, translation)
    }

    return children
}