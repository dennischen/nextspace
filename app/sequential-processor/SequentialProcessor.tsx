'use client'
/*
 * @file-created: 2023-11-03
 * @author: Dennis Chen
 */

import WorkspaceHolder from "@nextspace/contexts/workspace"
import { Process } from "@nextspace/types"
import { MouseEvent, useCallback, useContext, useState } from "react"

export default function SequentialProcessor({ id = 'test1' , procNumber = 2, maxTimeout = 3000 }: { id?: string, procNumber?: number, maxTimeout?: number }) {
    const workspace = useContext(WorkspaceHolder)

    const [running, setRunning] = useState(false)


    const onClickRun = useCallback((evt: MouseEvent) => {
        let processes: Process[] = [...Array(procNumber)].map((_, idx) => {
            return () => {
                return new Promise<void>(resolve => {
                    setTimeout(() => {
                        resolve()
                    }, Math.max(1000, Math.random() * maxTimeout))
                })
            }
        })

        processes = [
            async () => {
                setRunning(true)
            },
            ...processes,
            async () => {
                setRunning(false)
            }
        ]

        workspace.withProcessIndicator(processes)

    }, [workspace, procNumber, maxTimeout])

    return <div id={id} style={{ gap: 8 }}>
        <button disabled={running} onClick={onClickRun}>Run</button>
    </div>

}