/// <reference types="next" /> 
/// <reference types="next/image-types/global" />
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

export type Workspace = {
    readonly locales: string[]
    readonly i18n: I18n
    readonly progressIndicator: ProgressIndicator
    changeLocale(newLocale: string): void
    registerTranslation(locale: string, translation: any): void
    withProcessIndicator<T = any>(...processes: Process<T>[]): Promise<T>
}

export type WorkspaceConfig = {
    readonly translationHolder?: TranslationHolder
    readonly progressIndicator?: ProgressIndicator
}

export type I18n = {
    readonly locale: string
    l(key: string, args?: any): string
}

export type TranslationHolder = {
    register(locale: string, translation: any): void
    change(newLocale: string): void
    label(key: string, args?: any): string
}

export type Process<T = any> = {
    (): Promise<T>
}

export type ProgressIndicator = {
    start: () => void
    end: (force?: boolean) => void
    readonly loading: boolean
}

