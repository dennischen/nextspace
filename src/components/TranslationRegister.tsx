'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import useWorkspace from "@nextspace/useWorkspace"

export type TranslationRegisterProps = {
    language: string
    translation: { [key: string]: any }
    children?: React.ReactNode
}

export default function TranslationRegister({ language, translation, children }: TranslationRegisterProps) {
    const workspace = useWorkspace();

    if (language && translation) {
        workspace.registerTranslation(language, translation)
    }

    return children
}