import { Process } from "@nextspace/types"

/*
 * @file-created: 2023-10-30
 * @author: Dennis Chen
 */
export function sequential<T = any>(...processes: Process<T>[]): Promise<T> {
    return cancelableSequential(undefined, ...processes)
}

export function cancelableSequential<T = any>(
    cancel?: () => boolean,
    ...processes: Process<T>[]
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        try {
            if (!processes || processes.length === 0 || (cancel && cancel())) {
                //resolve nothing when canceling
                resolve(undefined as any)
            }
            const [nextproc, ...rest] = processes
            if(typeof nextproc !== 'function'){
                throw `process is not a function, is ${typeof nextproc}`
            }
            const promise = nextproc()

            promise
                .then((v) => {
                    if (!rest || rest.length === 0 || (cancel && cancel())) {
                        resolve(v)
                    } else {
                        return cancelableSequential(cancel, ...rest).then((v) => {
                            resolve(v)
                        })
                    }
                })
                .catch((err) => {
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
        r.push(p())
    })
    return Promise.all<T>(r)
}