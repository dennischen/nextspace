/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import { TranslationHolder } from '@/nextspace/types';
import i18next, { InitOptions, i18n } from 'i18next';


function handleLabel(i18: i18n, key: string, options: any = {}) {
    const { returnObjects, ...other } = options;
    const val = i18.t(key, { returnObjects: true, ...other }) as any;
    if (returnObjects || typeof val === 'string') {
        return val;
    }
    return val['@'] || `[key:${key}`;
}

export default class I18nextTranslationHolder implements TranslationHolder {

    i18: i18n

    constructor(
        opt: { fallbackLng?: string, fallbackTranslation?: { [key: string]: any }, debug?: boolean } = {}
    ) {
        this.i18 = i18next.createInstance()

        const initOpt: InitOptions = {
            debug: opt?.debug,
            returnObjects: true,
            missingKeyNoValueFallbackToKey: false,
            interpolation: {
                escapeValue: false,
            },
        }

        if (opt?.fallbackLng) {
            initOpt.lng = opt.fallbackLng;
            initOpt.fallbackLng = opt.fallbackLng;
            if (opt?.fallbackTranslation) {
                initOpt.resources = {}
                initOpt.resources[opt.fallbackLng] = {}
                initOpt.resources[opt.fallbackLng].translation = opt.fallbackTranslation;
            }
        }
        this.i18.init(initOpt)
    }

    register(locale: string, translation: { [key: string]: any }) {
        this.i18.addResourceBundle(locale, 'translation', translation)
    }

    setLocale(locale: string) {
        const { i18 } = this;
        this.i18.changeLanguage(locale)
    }

    l(key: string, args?: { [key: string]: string }) {
        return handleLabel(this.i18, key, args);
    }
}

