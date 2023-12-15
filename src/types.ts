// reference for build dist before run yarn dev(no next-dev.d.ts)
/// <reference types="next" />
/// <reference types="next/image-types/global" />

/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

/**
 * common event subscribe & unscribe interface,
 * it is usually use subscribe and unsubscribe in useEffect of a component
 */
export type Unsubscribe = {
    (): void
}

export type Listener = Function

export type Subscribe<L = Listener> = {
    (listener: L): Unsubscribe
}

export type StoreSubscribe = Subscribe<StoreListener>
export type StoreListener = () => void
/**
 * common store interface for useSyncExternalStore
 */
export type Store<S = any> = {
    subscribe: StoreSubscribe
    getSnapshot(): S
}

/**
 * workspace evet scribe listener
 */
export type WorkspaceSubscribe<D = any> = Subscribe<WorkspaceListener<D>>
export type WorkspaceListener<D = any> = (eventName: string, eventData: D) => void


export type Workspace = {
    readonly progressIndicator: ProgressIndicator
    readonly envVariables: { readonly [key: string]: string | undefined }
    withProcessIndicator<P = any, T = any>(processes: Process<P, T> | Process<P, T>[], initValue?: P): AbortablePromise<T>
    getStore<S = any>(name: string): Store<S> | undefined
    getStore<S = any>(name: string, init: (() => Store<S>)): Store<S>
    removeStore<S = any>(name: string): Store<S> | undefined

    /**
     * subscribe workspace event, you should call this in useEffect and return the unsubscribe to cleanup
     */
    subscribe: WorkspaceSubscribe

    /**
     * emit event to all subscribed listener by subscribe
     */
    emit: WorkspaceListener
}

export type WorkspaceConfig = {
    readonly progressIndicator?: ProgressIndicator
} & I18nConfig & ThemeConfig

export type I18nConfig = {
    readonly translationHolder?: TranslationHolder
}

export type ThemeConfig = {
    readonly themepackHolder?: ThemepackHolder
}

export type I18n = {
    readonly languages: string[]
    readonly language: string
    changeLanguage(language: string): void
    l(key: string, args?: any): string
}

export type TranslationHolder = {
    readonly language: string
    register(language: string, translation: any): void
    change(language: string): void
    label(key: string, args?: any): string
}

export type TranslationModule<T> = {
    default: T
    translation: any
}

export type ServerTranslation = {
    language: string
    translation: any
}

export type ServerI18n = {
    readonly language: string
    l(key: string, args?: any): string
}

export type Theme = {
    readonly codes: string[]
    readonly code: string
    readonly themepack: Themepack
    changeTheme(code: string): void
}

export type ThemepackHolder = {
    readonly code: string
    register(code: string, themepack: Themepack): void
    change(code: string): void
    get(): Themepack
}

export type Themepack = {
    //dark flag is required for some buildin component (e.g. Modal)
    readonly dark?: boolean
    readonly colorScheme?: string
}

export type Process<P = any, T = any> = {
    (prev: P): Promise<T>
}

export type ProgressIndicator = {
    start: () => void
    stop: (force?: boolean) => void
    readonly loading: boolean
}

export type AbortablePromise<T = any> = Promise<T> & {
    abort: () => void
    aborted(): boolean
    completed(): boolean
    step(): number
}