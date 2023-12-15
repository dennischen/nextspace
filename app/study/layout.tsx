import { CleanContext, context } from "@nextspace/server/request"
import TheLayout from "./TheLayout"


export default async function layout({ children }: { children: React.ReactNode }) {
    console.log("layout study body")
    console.log("layout study request context", context())
    return <div>
        [layout study]
        <TheLayout>
            {children}
        </TheLayout>
        [/layout study]
        <CleanContext/>
    </div>

}