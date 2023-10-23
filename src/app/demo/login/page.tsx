'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import BlankTemplate from "@/nextspace/layouts/Blank"
import loginStyles from "./login.module.scss"


type PageProps = {
}

export default function LoginPage({ }: PageProps) {
    return <div className={loginStyles.login}>
        <BlankTemplate>
            TODO
        </BlankTemplate>
    </div>
}