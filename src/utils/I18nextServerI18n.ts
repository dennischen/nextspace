/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { ServerI18n, ServerTranslation } from '@nextspace/types'
import type { i18n as I18nextInstance, InitOptions } from 'i18next'

function handleLabel(i18: I18nextInstance, key: string, options: any = {}) {
    const { returnObjects, ...other } = options
    const val = i18.t(key, { returnObjects: true, ...other }) as any
    if (returnObjects || typeof val === 'string') {
        return val
    }
    return val['@'] || `[key:${key}]`
}

export default class I18nextI18n implements ServerI18n {

    private i18n: I18nextInstance

    constructor(
        i18n: I18nextInstance,
        translation: ServerTranslation,
        opt: { fallbackLng?: string, fallbackTranslation?: { [key: string]: any }, debug?: boolean } = {}
    ) {
        this.i18n = i18n

        const initOpt: InitOptions = {
            debug: opt?.debug,
            returnObjects: true,
            missingKeyNoValueFallbackToKey: false,
            interpolation: {
                escapeValue: false,
            },
        }

        if (opt?.fallbackLng) {
            initOpt.lng = opt.fallbackLng
            initOpt.fallbackLng = opt.fallbackLng
            if (opt?.fallbackTranslation) {
                initOpt.resources = {}
                initOpt.resources[opt.fallbackLng] = {}
                initOpt.resources[opt.fallbackLng].translation = opt.fallbackTranslation
            }
        }
        this.i18n.init(initOpt)
        this.i18n.addResourceBundle(translation.language, 'translation', translation.translation)
        this.i18n.changeLanguage(translation.language)
    }

    get language(){
        return this.i18n.language
    }

    l(key: string, args?: any) {
        return handleLabel(this.i18n, key, args)
    }
}

