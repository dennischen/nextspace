import 'server-only'
import { ServerTranslation } from '@nextspace/types'

/*
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization
 * nextjs officially use async server page and async dictionaries to provider server i18n
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */
let _defaultLanguage = 'en'
const _loaderMap = new Map<string, () => Promise<{ default: any }>>()

export function putTranslationLoader(language: string, loader: () => Promise<{ default: any }>) {
    _loaderMap.set(language, loader)
}

export function setTranslationLoaders(loaders: {
    [language: string]: () => Promise<{ default: any }>
}, defaultLanguage?: string) {
    _loaderMap.clear()
    putTranslationLoaders(loaders)
    _defaultLanguage = defaultLanguage ?? _defaultLanguage
}

export function putTranslationLoaders(loaders: {
    [language: string]: () => Promise<{ default: any }>
}) {
    for (const language in loaders) {
        _loaderMap.set(language, loaders[language])
    }
}

export function setDefaultLanguage(language: string) {
    _defaultLanguage = language
}

export async function loadTranslation(language: string, localDefaultLanguage?: string): Promise<ServerTranslation> {
    let loader = _loaderMap.get(language)
    if (!loader) {
        language = localDefaultLanguage ?? _defaultLanguage
    }
    loader = _loaderMap.get(language)

    const translation = await (loader?.().then((m) => m.default) || {})
    return {
        language,
        translation
    }
}