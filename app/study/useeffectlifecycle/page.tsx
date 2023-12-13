import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation"
import ThePage from "./ThePage"

export async function generateMetadata({ params, searchParams }: {params: any, searchParams: ReadonlyURLSearchParams}) {
    console.log("page useeffectlifecycle generateMetadata", params, searchParams)
    return {
      title: '...',
    }
 }

export default function page({ params, searchParams }: {params: any, searchParams: ReadonlyURLSearchParams}) {
    console.log("page body", params, searchParams)


    useSearchParams

    return <div>
        [page]
        <ThePage/>
        [/page]
    </div>

}