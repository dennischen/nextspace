'use client'

import clsx from "clsx";
import styles from "./nextspace.module.scss";
import './variables.scss';
import { Suspense, useMemo, useState } from "react";
import WorkspaceHolder from "./contexts/workspaceContext";
import { I18n, I18nHandler, Workspace } from "./types";

export type WorkspaceBoundaryProps = {
    children: React.ReactNode
    className?: string
    i18nProvider?: I18nHandler
}

export default function WorkspaceBoundary({ children, className, i18nProvider }: WorkspaceBoundaryProps) {
    
    const workspace: Workspace = useMemo(() => {

        const i18n: I18n = {
            locale: locale,
            setLocal: setLocale,
            l: (key, args) => {
                return key
            }
        }

        return {
            i18n: i18n
        }
    }, [i18nProvider?.locale || "unknow"]);
    return <div className={clsx(styles.workspace, className)}>
        <Suspense fallback={<p>TODO Modal Loading...</p>}>
            <WorkspaceHolder.Provider value={workspace}>
                {children}
            </WorkspaceHolder.Provider>
        </Suspense>
    </div>
}

