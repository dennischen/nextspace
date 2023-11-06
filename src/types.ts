// reference for build dist before run yarn dev(no next-dev.d.ts)
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

export type Workspace = {
    readonly languages: string[]
    readonly i18n: I18n
    readonly progressIndicator: ProgressIndicator
    readonly themes: string[]
    readonly themepack: Themepack
    changeLanguage(nextLanguage: string): void
    registerTranslation(language: string, translation: any): void
    changeTheme(nextTheme: string): void
    registerThemepack(theme: string, themepack: Themepack): void
    withProcessIndicator<T = any>(...processes: Process<T>[]): Promise<T>
}

export type WorkspaceConfig = {
    readonly translationHolder?: TranslationHolder
    readonly themepackHolder?: ThemepackHolder
    readonly progressIndicator?: ProgressIndicator
}

export type I18n = {
    readonly language: string
    l(key: string, args?: any): string
}

export type TranslationHolder = {
    register(language: string, translation: any): void
    change(language: string): void
    label(key: string, args?: any): string
}

export type ThemepackHolder = {
    register(theme: string, themepack: Themepack): void
    change(theme: string): void
    get(): Themepack
}

export type Process<T = any> = {
    (): Promise<T>
}

export type ProgressIndicator = {
    start: () => void
    end: (force?: boolean) => void
    readonly loading: boolean
}

//I need extends themepack but type doesn't suuport, so have to use interfce
export interface Themepack<V = any, S = any, I = any>{
    readonly theme: string
    readonly dark?: boolean
    readonly variables: V
    readonly styles: S
    readonly images: I
}