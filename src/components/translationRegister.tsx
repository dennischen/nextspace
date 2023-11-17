/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import useWorkspace from "@nextspace/useWorkspace"

import { TranslationLoaderProps } from "./translationLoader"

type TranslationRegisterProps = {
    language: string
    translation: any
    children?: React.ReactNode
}

function TranslationRegister({ language, translation, children }: TranslationRegisterProps) {
    const workspace = useWorkspace()

    if (language && translation) {
        workspace.registerTranslation(language, translation)
    }

    return children
}

export function translationRegister(translation: any) {
    return function TranslationLoaderComp({ language, children }: TranslationLoaderProps) {
        return <TranslationRegister language={language} translation={translation} >{children}</TranslationRegister>
    }
}

export default translationRegister
