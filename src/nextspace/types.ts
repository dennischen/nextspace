

export type Workspace = {
    i18n: I18n
    // theme: () => Theme
    // isAuth: () => boolean;
    // getAuth: () => Auth | undefined
}

export type I18n = {
    readonly locale: string
    setLocal(locale: string): void
    l(key: string, args?: { [key: string]: string }): string
}

// export type Theme = {

// }

// export type Auth = {
//     readonly token: string
// }