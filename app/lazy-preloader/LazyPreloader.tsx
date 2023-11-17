'use client'
/*
* @file-created: 2023-10-30
* @author: Dennis Chen
*/

import Modal from "@nextspace/components/Modal"
import lazyWithPreload from "@nextspace/components/lazyWithPreload"
import useWorkspace from "@nextspace/useWorkspace"
import { Suspense, lazy, useState } from "react"

//delay 2s for testing
const Panel1 = lazy(() => import('@/components/Panel1').then((m) => new Promise<any>(resolve => setTimeout(() => resolve(m), 2000))))
const Panel2 = lazyWithPreload(() => import('@/components/Panel2').then((m) => new Promise<any>(resolve => setTimeout(() => resolve(m), 2000))))

export default function LazyPreloader({ id = 'test1' }: { id?: string }) {
    const workspace = useWorkspace()

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
            <Suspense fallback={<Modal><p>Loading...</p></Modal>}>
                {panel === 'panel1' && <Panel1 />}
                {panel === 'panel2' && <Panel2 />}
            </Suspense>
        </div>
    </main>
}