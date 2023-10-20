import Link from "next/link"
import demoStyles from "./demo.module.scss"

import en from "./i18n/en"
import zh from "./i18n/zh"



type PageProps = {
}

export default function NextspacePage({ }: PageProps) {
    
    console.log(">>>>", en, zh);


    return <main className={demoStyles.main}>
        <Link href="/demo/language">Language</Link>
        <Link href="/demo/theme">Theme</Link>
    </main>
}