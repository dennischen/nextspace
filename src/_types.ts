/*
 * @file-created: 2023-11-20
 * @author: Dennis Chen
 */

import { Themepack } from "./types"

export type _Workspace = {
    _notifyRouting(path: string): void
}

export type _I18n = {
    _registerTranslation(language: string, translation: any): void
}

export type _Theme = {
    _registerThemepack(code: string, themepack: Themepack): void
}
