'use client'
/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import TranslationRegister, { TranslationLoaderProps } from "@/nextspace/components/TranslationRegister";
import translation from "./zh.json";

const locale = "zh"

export default function TranslationLoader({ children }: TranslationLoaderProps) {
    return <TranslationRegister locale={locale} translation={translation} >{children}</TranslationRegister>;
}