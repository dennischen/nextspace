/*
 * @file-created: 2023-10-30
 * @author: Dennis Chen
 */

import { AbortablePromise, Process } from "@nextspace/types"

export type SequentialOption = {
    step?: (step: number) => void
}

type SequenticalState = {
    aborted?: boolean
    completed?: boolean
    step: number
}

export function sequential<P = any, T = any>(processes: Process<P, T>[], initValue?: P, option?: SequentialOption): AbortablePromise<T> {
    const state: SequenticalState = {
        step: 0
    }
    const abort = () => {
        state.aborted = true
    }
    const completed = () => !!state.completed
    const aborted = () => !!state.aborted
    const step = () => state.step

    return Object.assign(_sequential(state, processes, initValue as P, option), {
        abort,
        aborted,
        completed,
        step
    })

}
function _sequential<P = any, T = any>(state: SequenticalState, processes: Process<P, T>[], prev: P, option?: SequentialOption): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        try {
            if (!processes || processes.length === 0) {
                state.completed = true
                resolve(undefined as any as T)
            }
            const [nextProc, ...rest] = processes
            if (typeof nextProc !== 'function') {
                throw `process is not a function, is ${typeof nextProc}`
            }
            nextProc(prev).then((val) => {
                if (!rest || rest.length === 0) {
                    state.completed = true
                    resolve(val)
                } else if (state.aborted) {
                    resolve(val)
                } else {
                    state.step += 1
                    option?.step?.(state.step)
                    return _sequential(state, rest, val as any as P, option).then((nextVal) => {
                        resolve(nextVal)
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
        r.push(p(undefined as any as T))
    })
    return Promise.all<T>(r)
}