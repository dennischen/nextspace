'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */
import clsx from "clsx";
import { Suspense, useCallback, useMemo, useState } from "react";
import type { TranslationLoaderProps } from "./components/TranslationRegister";
import WorkspaceHolder from "./contexts/workspaceContext";
import styles from "./nextspace.module.scss";
import { I18n, Workspace, WorkspaceConfig, WorkspacePri } from "./types";
import SimpleTranslationHolder from "./utils/SimplIeTranslationHolder";
import './variables.scss';

export type WorkspaceBoundaryProps = {
    children: React.ReactNode
    className?: string
    defaultLocale?: string
    translations?: { locale: string, lazyLoader: React.LazyExoticComponent<React.ComponentType<TranslationLoaderProps>> }[]
    config?: WorkspaceConfig
}

let defaultConfig: WorkspaceConfig = {
    translationHolder: new SimpleTranslationHolder()
}

export function setDefaultConfig(config: WorkspaceConfig) {
    defaultConfig = Object.assign({}, defaultConfig, config);
}


export default function WorkspaceBoundary(props: WorkspaceBoundaryProps) {
    const { children, className, defaultLocale = "", translations = [] } = props
    let { config = {} } = props

    config = Object.assign({}, defaultConfig, config);

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
    const [refresh, setRefresh] = useState(0);
    const _refresh = function () {
        setRefresh(refresh + 1);
    }

    const translationHolder = config.translationHolder
    translationHolder?.setLocale(locale);

    const workspace = useMemo(() => {
        const i18n: I18n = {
            locale,
            setLocale: (locale) => {
                assertInTranslation(locale);
                translationHolder?.setLocale(locale);
                setLocale(locale);
            },
            l: (key, args) => {
                return translationHolder?.l(key, args) || key;
            },

        }
        return {
            locales: translationLocales,
            _registerTranslation: (locale, translation) => {
                translationHolder?.register(locale, translation);

                //I did a trick here, since TransationLoader is rendered before children, so it can register language without rerender for
                //1.by _refash(), it will cause setState in rendering error (client)
                //2.by useEffect is not called in server, it will cause hydration warn (html difference between first server-client rendering)

                // _refresh(); 
            },
            i18n: i18n
        } as (Workspace & WorkspacePri)
    }, [defaultLocale, locale]);

    const TransationLoader = (translations && translations.find((t) => t.locale === locale)?.lazyLoader);

    return <div className={clsx(styles.workspace, className)}>
        <Suspense fallback={<p>TODO Modal Loading...</p>}>
            <WorkspaceHolder.Provider value={workspace}>
                {TransationLoader ? <TransationLoader>{children}</TransationLoader> : children}
            </WorkspaceHolder.Provider>
        </Suspense>
    </div>
}

