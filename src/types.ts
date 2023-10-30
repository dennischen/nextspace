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
    onChangeLocale(newLocale: string): void
    registerTranslation(locale: string, translation: { [key: string]: any }): void
    withProcessIndicator<T = any>(process: Process<T>): Promise<T>
}

export type WorkspaceConfig = {
    readonly translationHolder?: TranslationHolder
    readonly progressIndicator?: ProgressIndicator
}

export type I18n = {
    readonly locale: string
    l(key: string, args?: { [key: string]: string }): string
}

export type TranslationHolder = {
    register(locale: string, translation: { [key: string]: any }): void
    change(newLocale: string): void
    label(key: string, args?: { [key: string]: string }): string
}

export type Process<T = any> = {
    (): Promise<T>
}

export type ProgressIndicator = {
    start: () => void
    end: (force?: boolean) => void
    readonly loading: boolean
}

