/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { TranslationHolder } from '@nextspace/types'
import type { InitOptions, i18n as I18nextInstance } from 'i18next'

function handleLabel(i18: I18nextInstance, key: string, options: any = {}) {
    const { returnObjects, ...other } = options
    const val = i18.t(key, { returnObjects: true, ...other }) as any
    if (returnObjects || typeof val === 'string') {
        return val
    }
    return val['@'] || `[key:${key}]`
}

export default class I18nextTranslationHolder implements TranslationHolder {

    private i18n: I18nextInstance

    private _language: string = ""

    constructor(
        i18n: I18nextInstance,
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
    }

    get language(){
        return this._language
    }

    register(language: string, translation: any) {
        this.i18n.addResourceBundle(language, 'translation', translation)
    }

    change(language: string) {
        this._language = language
        this.i18n.changeLanguage(language)
    }

    label(key: string, args?: any) {
        return handleLabel(this.i18n, key, args)
    }
}

