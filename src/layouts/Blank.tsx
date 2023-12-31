/*
 * @file-created: 2023-10-23
 * @author: Dennis Chen
 */

import styles from "./blank.module.scss"

type BlankProps = {
    children: React.ReactNode
}

export default function BlankTemplate({ children }: BlankProps) {
    return <div className={styles.blank}>
        Blank
        <br/>
        {children}
    </div>
}