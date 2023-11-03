'use client'
import { useContext } from "react"
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import WorkspaceHolder from "@nextspace/contexts/workspace"
import appStyles from "./app.module.scss"
import SequentialProcessor from "./sequential-processor/SequentialProcessor"

type PageProps = {
}

export default function DemoPage({ }: PageProps) {
    const workspace = useContext(WorkspaceHolder)
    const { i18n } = workspace

    return <main className={appStyles.main}>
        {i18n.l('nextspace')}
    </main>
}