'use client'
import BlankTemplate from "../_/templates/Blank"
import styles from "./login.module.scss"


type PageProps = {
    children: React.ReactNode
}

export default function NextspacePage({ children }: PageProps) {
    return <div className={styles.login}>
        <BlankTemplate>
            Login
        </BlankTemplate>
    </div>
}