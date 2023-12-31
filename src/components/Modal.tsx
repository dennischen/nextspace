'use client'
/*
 * @file-created: 2023-10-24
 * @author: Dennis Chen
 */

import styles from "@nextspace/nextspace.module.scss"
import clsx from "clsx"
import { createPortal } from "react-dom"

const MODAL_CLASS_NAME = 'nextspace-modal'

export type ModalProps = {
    children?: React.ReactNode
    container?: HTMLElement
    delay?: number
}

export default function Modal({ container, children }: ModalProps) {
    const content = <div className={clsx(MODAL_CLASS_NAME, styles.modal)}>{children}</div>
    if (!container && typeof document === 'undefined') {
        return content
    }
    return createPortal(content, container || document.body)
}