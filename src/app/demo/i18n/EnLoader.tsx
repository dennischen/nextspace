'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */
import TranslationRegister, { TranslationLoaderProps } from "@/nextspace/components/TranslationRegister";
import translation from "./en.json";

const locale = "en"

export default function TranslationLoader({ children }: TranslationLoaderProps) {
    return <TranslationRegister locale={locale} translation={translation} >{children}</TranslationRegister>;
}