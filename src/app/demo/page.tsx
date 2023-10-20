import Link from "next/link"
import demoStyles from "./demo.module.scss"

type PageProps = {
}

export default function DemoPage({ }: PageProps) {
    return <main className={demoStyles.main}>
        <Link href="/demo/language">Language</Link>
        <Link href="/demo/theme">Theme</Link>
    </main>
}