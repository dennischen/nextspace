'use client'

import { createPortal } from "react-dom";
import styles from "@/nextspace/nextspace.module.scss";
import { useState, useEffect } from "react";
import clsx from "clsx";
/*
 * @file-created: 2023-10-24
 * @author: Dennis Chen
 */

export type DelayedFallbackProps = {
    children?: React.ReactNode;
    delay?: number
}

export default function DelayedFallback({ children, delay = 500 }: DelayedFallbackProps) {

    const [show, setShow] = useState(delay > 0 ? false : true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true)
        }, delay);
        return () => clearTimeout(timer);
    }, [show]);

    const content = <div className={clsx(styles.modal, !show && styles.hide)}>{children ? children : <p>Loading...</p>}</div>
    if (typeof document === 'undefined') {
        return content;
    }
    return createPortal(content, document.body);
}