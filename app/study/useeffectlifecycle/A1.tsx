'use client'

import { ReactNode, useEffect } from "react"
import A2 from "./A2"
import A3 from "./A3"


export default function A1({ children }: { children?: ReactNode }) {
    console.log(`A1 body`)

    useEffect(() => {
        console.log(`A1 useEffect`)
    }, [])
    return <div>
        [A1]
        <A2>
            <A3>
                {children}
            </A3>
        </A2>
        [/A1]
    </div>
}