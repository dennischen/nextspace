'use client'

import { ReactNode, useEffect } from "react"


export default function A3({ children }: { children?: ReactNode }) {
    console.log(`A3 body`)

    useEffect(()=>{
        console.log(`A3 useEffect`)
    },[])

    return <div>
        [A3]
        {children}
        [/A3]
    </div>
}