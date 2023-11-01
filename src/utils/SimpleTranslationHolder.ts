/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { TranslationHolder } from '@nextspace/types'

export default class SimpleTranslationHolder implements TranslationHolder {

    private translationMap = new Map<string, any>();
    private _language: string = "";

    register(language: string, translation: any) {
        const { translationMap } = this
        translationMap.set(language, translation)
    }

    change(nextLanguage: string) {
        this._language = nextLanguage
    }

    label(key: string, args?: any) {
        const { _language, translationMap } = this
        const val = translationMap.get(_language)?.[key]
        return val || key
    }
}

