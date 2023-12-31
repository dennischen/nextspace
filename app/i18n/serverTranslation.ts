
/*
 * @file-created: 2023-11-22
 * @author: Dennis Chen
 */

import { loadTranslation, setTranslationLoaders } from '@nextspace/server/serverI18n'
import { ServerI18n } from '@nextspace/types'
import SimpleServerI18n from '@nextspace/utils/SimpleServerI18n'
import 'server-only'

/*
 * https://nextjs.org/docs/app/building-your-application/routing/internationalization
 * nextjs officially use async server page and async dictionaries to provider server i18n
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */
// const translations = {
//     en: () => import('./en.json').then((module) => module.default),
//     zh: () => import('./zh.json').then((module) => module.default),
// }

// export default async function getTranslation(language: string) {
//     const fn = (translations as any)[language]
//     const translation = await (fn ?? translations.en)()
//     return {
//         language: fn ? language : 'en',
//         translation
//     }
// }


setTranslationLoaders({
    en: () => import('./en.json'),
    zh: () => import('./zh.json'),
})

export async function getI18n(language: string): Promise<ServerI18n> {
    const translation = await loadTranslation(language)
    return new SimpleServerI18n(translation)
}

