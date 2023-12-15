'use client'
/*
 * @file-created: 2023-11-17
 * @author: Dennis Chen
 */

import { useMemo, useState } from "react"
import { TranslationLoader, TranslationLoaderProps } from "./components/translationLoader"
import I18nHolder from "./contexts/i18n"
import './global.scss'
import { I18n, I18nConfig } from "./types"
import useWorkspace from "./useWorkspace"
import SimpleTranslationHolder from "./utils/SimpleTranslationHolder"
import { _I18n } from "./_types"
import { EMPTY_ARRAY, EMPTY_OBJECT } from "./constants"


export type I18nBoundaryProps = {
    children?: React.ReactNode
    defaultLanguage?: string
    translationLoaders?: TranslationLoader<React.ComponentType<TranslationLoaderProps>>[]
    config?: I18nConfig
}


function assertTranslation(language: string | undefined,
    loaders: TranslationLoader<React.ComponentType<TranslationLoaderProps>>[]) {
    if (language) {
        const translation = loaders.find((t) => t.language === language)
        if (!translation) {
            throw `No ${language} found in translations [${loaders.join(",")}]`
        }
        return translation
    }
}

export default function I18nBoundary(props: I18nBoundaryProps) {
    const { children,
        defaultLanguage = "", translationLoaders = EMPTY_ARRAY
        , config = EMPTY_OBJECT as I18nConfig } = props

    const workspace = useWorkspace()

    const translationHolder = useMemo(() => {
        return config.translationHolder || new SimpleTranslationHolder()
    }, [config])

    //check defaultLocal in loaders
    assertTranslation(translationHolder.language, translationLoaders)
    assertTranslation(defaultLanguage, translationLoaders)

    const [language, setLanguage] = useState(translationHolder.language || defaultLanguage || translationLoaders.find(t => true)?.language || '')

    translationHolder.change(language)

    const i18n = useMemo(() => {
        //i18n
        const translationLanguages = translationLoaders && translationLoaders.map((t) => t.language) || []
        const changeLanguage = (nextLanguage: string) => {
            const loader = assertTranslation(nextLanguage, translationLoaders)
            const lstatus = loader?._nextspace._status || 0

            if (language === nextLanguage) {
                return
            }
            if (lstatus > 0 || !loader) {
                //loaded, change language directly
                translationHolder.change(nextLanguage)
                setLanguage(nextLanguage)
            } else {
                workspace?.progressIndicator.start()
                loader.preload().then(() => {
                    translationHolder.change(nextLanguage)
                    setLanguage(nextLanguage)
                }).finally(() => {
                    workspace?.progressIndicator.stop()
                })

            }
        }
        const i18n: I18n & _I18n = {
            languages: translationLanguages,
            language,
            changeLanguage,
            l: (key, args) => {
                return translationHolder.label(key, args) || key
            },
            _registerTranslation: (language, translation) => {
                translationHolder.register(language, translation)
            },

        }

        return i18n
    }, [language, translationLoaders, translationHolder, workspace])

    const TransationLoader = assertTranslation(language, translationLoaders)

    return <I18nHolder.Provider value={i18n}>
        {TransationLoader ? <TransationLoader language={language}>
            {children}
        </TransationLoader> : children}
    </I18nHolder.Provider>
}
