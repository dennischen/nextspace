'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import useI18n from "@nextspace/useI18n"
import appStyles from "./app.module.scss"
import useWorkspace from "@nextspace/useWorkspace"

type PageProps = {
}

export default function DemoPage({ }: PageProps) {
    const workspace = useWorkspace()
    const i18n = useI18n()

    return <main className={appStyles.main}>
        {i18n.l(workspace.envVariables.APP_PUBLIC_SHORT_NAME || '')}
    </main>
}