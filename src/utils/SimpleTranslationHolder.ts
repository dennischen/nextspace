/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { TranslationHolder } from '@nextspace/types'

export default class SimpleTranslationHolder implements TranslationHolder {

    private translationMap = new Map<string, any>();
    private language: string = "";

    register(language: string, translation: any) {
        const { translationMap } = this
        translationMap.set(language, translation)
    }

    change(language: string) {
        this.language = language
    }

    label(key: string, args?: any) {
        const { language, translationMap } = this
        const val = translationMap.get(language)?.[key]
        return val || key
    }
}

