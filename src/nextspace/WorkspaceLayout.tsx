'use client'

import clsx from "clsx";
import styles from "./nextspace.module.scss";
import './variables.scss';
import { Suspense, useMemo, useState } from "react";
import WorkspaceHolder from "./contexts/workspaceContext";
import { I18n, Workspace } from "./types";

export type WorkspaceLayoutProps = {
    children: React.ReactNode
    className?: string
    locale? :string;
}

export default function WorkspaceLayout({ children, className }: WorkspaceLayoutProps) {
    const [locale, setLocale] = useState("en");

    const workspace: Workspace = useMemo(() => {

        const i18n: I18n = {
            locale: locale,
            setLocal: setLocale,
            l: (key, args)=>{
                return key
            }
        }

        return {
            i18n: i18n
        }
    }, [locale]);
    return <div className={clsx(styles.workspace, className)}>
        <Suspense fallback={<p>Loading...</p>}>
            <WorkspaceHolder.Provider value={workspace}>
                {children}
            </WorkspaceHolder.Provider>
        </Suspense>
    </div>
}

