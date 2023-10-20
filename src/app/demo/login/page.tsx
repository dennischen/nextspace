'use client'
import BlankTemplate from "@/nextspace/layouts/Blank"
import loginStyles from "./login.module.scss"


type PageProps = {
    children: React.ReactNode
}

export default function NextspacePage({ children }: PageProps) {
    return <div className={loginStyles.login}>
        <BlankTemplate>
            Login
        </BlankTemplate>
    </div>
}