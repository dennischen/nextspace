'use client'
import WorkspaceHolder from "@/nextspace/contexts/workspaceContext";
import { useContext, useEffect, useMemo } from "react";

export type TranslationProps = {
    lang: string;
    translation: { [key: string]: any }
}

let count = 0;

export default function Translation({ lang, translation }: TranslationProps) {
    const workspace = useContext(WorkspaceHolder);
    
    workspace.registerTranslation(lang, translation)

    return <div />;
}