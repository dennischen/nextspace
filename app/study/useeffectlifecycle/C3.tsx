'use client'

import { ReactNode, useEffect } from "react"


export default function C3({ children }: { children?: ReactNode }) {
    console.log(`C3 body`)

    useEffect(()=>{
        console.log(`C3 useEffect`)
    },[])

    return <div>
        [C3]
        {children}
        [/C3]
    </div>
}