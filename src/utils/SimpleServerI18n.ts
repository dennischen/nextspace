/*
 * @file-created: 2023-11-22
 * @author: Dennis Chen
 */

import { ServerI18n, ServerTranslation } from '@nextspace/types'

export default class SimpleServerI18n implements ServerI18n {

    private translation: any
    readonly language: string

    constructor(translation: ServerTranslation) {
        this.language = translation.language
        this.translation = translation.translation
    }


    l(key: string, args?: any) {
        const val = this.translation?.[key]
        return val || key
    }
}

