'use client'
/*
 * @file-created: 2023-11-02
 * @author: Dennis Chen
 */
import useI18n from "@nextspace/useI18n"

export default function I18nInfo({ id, labelKey, args }: { id?: string, labelKey: string, args?: any }) {
    const i18n = useI18n();
    return <div id={id}>
        <span data-locale>{i18n.language}</span>
        <span data-label>{i18n.l(labelKey, args)}</span>
    </div>

}