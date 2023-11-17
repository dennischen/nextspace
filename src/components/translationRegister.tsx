/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import useI18n from "@nextspace/useI18n"

import { TranslationLoaderProps } from "./translationLoader"

type TranslationRegisterProps = {
    language: string
    translation: any
    children?: React.ReactNode
}

function TranslationRegister({ language, translation, children }: TranslationRegisterProps) {
    const i18n = useI18n()

    if (language && translation) {
        i18n._registerTranslation(language, translation)
    }

    return children
}

export function translationRegister(translation: any) {
    return function TranslationLoader({ language, children }: TranslationLoaderProps) {
        return <TranslationRegister language={language} translation={translation} >{children}</TranslationRegister>
    }
}

export default translationRegister
