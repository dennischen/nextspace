'use client'

import clsx from "clsx";
import { Suspense, useCallback, useMemo, useState } from "react";
import WorkspaceHolder from "./contexts/workspaceContext";
import styles from "./nextspace.module.scss";
import { I18n, Workspace } from "./types";
import './variables.scss';

export type WorkspaceBoundaryProps = {
    children: React.ReactNode
    className?: string
    defaultLocale?: string
    translations?: { locale: string, lazyLoader: React.LazyExoticComponent<React.FunctionComponent> }[]
}

const translationMap = new Map<string, any>();

export default function WorkspaceBoundary({ children, className, defaultLocale = "", translations = [] }: WorkspaceBoundaryProps) {

    const translationLocales: string[] = translations && translations.map((t) => t.locale) || []

    const assertInTranslation = useCallback((locale: string | undefined) => {
        if (locale) {
            if (!translations.find((t) => t.locale === locale)) {
                throw `No ${locale} found in translations [${translations.join(",")}]`
            }
        }
    }, translationLocales)

    //check defaultLocal in translations
    assertInTranslation(defaultLocale);

    const [locale, setLocale] = useState(defaultLocale || translations.find(t => true)?.locale || '');

    const workspace = useMemo(() => {
        const i18n: I18n = {
            locale,
            setLocal: (locale) => {
                console.log(`set locale ${locale}`);
                assertInTranslation(locale);
                setLocale(locale);
            },
            l: (key, args) => {
                //TODO
                const val = translationMap.get(locale)?.[key];
                console.log(`get ${key} from ${locale} : ${val}`);
                return val || key;
            },

        }
        return {
            locales: translationLocales,
            registerTranslation: (locale, translation) => {
                //TODO
                console.log(`register ${locale}`, translation);
                translationMap.set(locale, translation);
                //refresh? external store
            },
            i18n: i18n
        } as Workspace
    }, [defaultLocale, locale]);

    const TransationLoader = translations && translations.find((t) => t.locale === locale)?.lazyLoader;
    console.log(">>>TransationLoader", TransationLoader);

    return <div className={clsx(styles.workspace, className)}>
        <Suspense fallback={<p>TODO Modal Loading...</p>}>
            <WorkspaceHolder.Provider value={workspace}>
                {TransationLoader && <TransationLoader />}
                {children}
            </WorkspaceHolder.Provider>
        </Suspense>
    </div>
}

