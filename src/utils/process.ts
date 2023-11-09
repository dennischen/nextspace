/*
 * @file-created: 2023-10-30
 * @author: Dennis Chen
 */

import { Process } from "@nextspace/types"

export type SequentialPromise<T = any> = Promise<T> & {
    cancel: () => void
    canceled(): boolean
    completed(): boolean
}

export function sequential<P = any, T = any>(...processes: Process<P, T>[]): SequentialPromise<T> {
    const state = {
        canceled: false,
        completed: false
    }
    const cancel = () => {
        state.canceled = true
    }
    
    const completed = () => state.completed
    const canceled = () => state.canceled

    return Object.assign(_sequential(state, undefined as any, ...processes), {
        cancel,
        canceled,
        completed
    })

}
function _sequential<P = any, T = any>(state: { canceled: boolean, completed: boolean }, prev: P, ...processes: Process<P, T>[]): Promise<T> {
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
                } else if (state.canceled) {
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