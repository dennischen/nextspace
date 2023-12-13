'use client'

import { useEffect } from "react"
import A1 from "./A1"
import B1 from "./B1"
import C1 from "./C1"
import D1 from "./D1"

export default function ThePage() {
    console.log("ThePage body")

    useEffect(() => {
        console.log("ThePage useEffect")
    }, [])


    const c = <C1>
        <D1 />
    </C1>

    return <div>
        [The page]
        <A1>
            <B1 />
        </A1>
        {c}
        [/The page]
    </div>

}