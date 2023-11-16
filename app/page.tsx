'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import useI18n from "@nextspace/useI18n"
import appStyles from "./app.module.scss"

type PageProps = {
}

export default function DemoPage({ }: PageProps) {
    const i18n = useI18n();

    return <main className={appStyles.main}>
        {i18n.l('nextspace')}
    </main>
}