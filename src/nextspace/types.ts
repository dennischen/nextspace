

export type Workspace = {
    locales: string[]
    registerTranslation: (locale: string, translation: any) => void
    i18n: I18n
}

export type I18n = {
    readonly locale: string
    setLocal(locale: string): void
    l(key: string, args?: { [key: string]: string }): string
}


