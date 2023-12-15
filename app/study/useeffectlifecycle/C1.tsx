'use client'

import { ReactNode, useEffect } from "react"
import C2 from "./C2"
import C3 from "./C3"


export default function C1({ children }: { children?: ReactNode }) {
    console.log(`C1 body`)

    useEffect(() => {
        console.log(`C1 useEffect`)
    }, [])
    return <div>
        [C1]
        <C2>
            <C3/>
            {children}
        </C2>
        [/C1]
    </div>
}