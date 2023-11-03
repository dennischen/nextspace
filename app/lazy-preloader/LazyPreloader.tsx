'use client'
/*
 * @file-created: 2023-10-30
 * @author: Dennis Chen
 */

import lazyWithPreload from "@nextspace/components/lazyWithPreload"
import WorkspaceHolder from "@nextspace/contexts/workspace"
import { lazy, useContext, useState } from "react"

//delay 2s for testing
const Panel1 = lazy(() => import('@/components/Panel1').then((m) => new Promise<any>(resolve => setTimeout(() => resolve(m), 2000))))
const Panel2 = lazyWithPreload(() => import('@/components/Panel2').then((m) => new Promise<any>(resolve => setTimeout(() => resolve(m), 2000))))

export default function LazyPreloader({ id = 'test1'  }: { id?: string }) {
    const workspace = useContext(WorkspaceHolder)

    const [panel, setPanel] = useState('')

    const onChangePanel = (panel: string) => {
        switch (panel) {
            case 'panel1':
                setPanel(panel)
                break
            case 'panel2':
                workspace.withProcessIndicator(() => Panel2.preload()).then(() => {
                    setPanel(panel)
                })
        }


    }

    return <main>
        <div id={id || 'test1'}>
            <div>
                <button className="btn1" disabled={panel === 'panel1'} onClick={() => onChangePanel('panel1')}>Panel1</button>
                <button className="btn2" disabled={panel === 'panel2'} onClick={() => onChangePanel('panel2')}>Panel2</button>
            </div>
            {panel === 'panel1' && <Panel1 />}
            {panel === 'panel2' && <Panel2 />}
        </div>
    </main>
}