/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { TranslationHolder } from '@nextspace/types'

export default class SimpleTranslationHolder implements TranslationHolder {

    private translationMap = new Map<string, any>();
    private _locale: string = "";

    register(locale: string, translation: { [key: string]: any }) {
        const { translationMap } = this
        translationMap.set(locale, translation)
    }

    change(newLocale: string) {
        this._locale = newLocale
    }

    label(key: string, args?: { [key: string]: string }) {
        const { _locale, translationMap } = this
        const val = translationMap.get(_locale)?.[key]
        return val || key
    }
}

