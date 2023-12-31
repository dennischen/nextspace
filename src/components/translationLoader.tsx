/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import lazyWithPreload, { PreloadableComponent } from '@nextspace/components/lazyWithPreload'
import { TranslationModule } from '@nextspace/types'

export type TranslationLoaderProps = {
    language: string
    children?: React.ReactNode
}

export type TranslationLoader<T extends React.ComponentType<any>> = PreloadableComponent<T> & {

    readonly language: string

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

export function translationLoader<T extends React.ComponentType<any>>(language: string, factory: () => Promise<TranslationModule<T>>) {

    let lazyWrap: TranslationLoader<T>
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
        language,
        _nextspace: {
            _status: 0
        }
    })
    return lazyWrap
}

export default translationLoader