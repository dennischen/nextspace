/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */

import lazyWithPreload, { PreloadableComponent } from '@nextspace/components/lazyWithPreload'

export type ThemepackLoaderProps = {
    theme: string
    children?: React.ReactNode
}

export type ThemepackLoaderComponent<T extends React.ComponentType<any>> = PreloadableComponent<T> & {

    readonly theme: string

    readonly _nextspace: {
        /**
         * 0 : not loaded yet
         * 1 : loaded
         * -1 : error
         */
        readonly _status: number
        /**
         * error when loading
         */
        readonly _error?: string
    }
}


export default function themepackLoader<T extends React.ComponentType<any>>(theme: string, factory: () => Promise<{ default: T }>) {
    let lazyWrap: ThemepackLoaderComponent<T>
    const factoryWrap = () => {
        return factory().then((loadedModule) => {
            Object.assign(lazyWrap._nextspace, {
                _status: 1
            })
            return loadedModule
        }).catch((err) => {
            Object.assign(lazyWrap._nextspace, {
                lazyWrap: -1,
                _error: typeof err === 'string' ? err : JSON.stringify(err)
            })
            throw err
        })
    }
    lazyWrap = Object.assign(lazyWithPreload(factoryWrap), {
        theme,
        _nextspace: {
            _status: 0
        }
    })
    return lazyWrap
}


