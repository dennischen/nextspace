'use client'

import { useContext } from "react"
import demoStyles from "./demo.module.scss"
import WorkspaceHolder from "@/nextspace/contexts/workspace"
import Link from "next/link"

export default function Footer() {
    const workspace = useContext(WorkspaceHolder)
    const { i18n } = workspace
    return <div className={demoStyles.footer} >
        <Link href={"https://github.com/dennischen/nextspace"} target="_blank">Github {i18n.l('project')}</Link>
    </div>
}