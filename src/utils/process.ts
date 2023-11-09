/*
 * @file-created: 2023-10-30
 * @author: Dennis Chen
 */

import { Process } from "@nextspace/types"

export type SequentialPromise<T = any> = Promise<T> & {
    abort: () => void
    aborted(): boolean
    completed(): boolean
}

export function sequential<P = any, T = any>(...processes: Process<P, T>[]): SequentialPromise<T> {
    const state = {
        aborted: false,
        completed: false
    }
    const abort = () => {
        state.aborted = true
    }
    
    const completed = () => state.completed
    const aborted = () => state.aborted

    return Object.assign(_sequential(state, undefined as any, ...processes), {
        abort,
        aborted,
        completed
    })

}
function _sequential<P = any, T = any>(state: { aborted: boolean, completed: boolean }, prev: P, ...processes: Process<P, T>[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        try {
            if (!processes || processes.length === 0) {
                state.completed = true;
                resolve(undefined as any)
            }
            const [nextProc, ...rest] = processes
            if (typeof nextProc !== 'function') {
                throw `process is not a function, is ${typeof nextProc}`
            }
            nextProc(prev).then((val) => {
                if (!rest || rest.length === 0) {
                    state.completed = true;
                    resolve(val)
                } else if (state.aborted) {
                    resolve(undefined as any)
                } else {
                    return _sequential(state, val as any, ...rest).then((nval) => {
                        resolve(nval)
                    })
                }
            }).catch((err) => {
                reject(err)
            })
        } catch (err) {
            reject(err)
        }
    })
}

export function all<T = any>(...processes: Process<T>[]): Promise<T[]> {
    const r: Promise<T>[] = []
    processes.forEach((p) => {
        //invoke to process parallely
        r.push(p(undefined as any))
    })
    return Promise.all<T>(r)
}