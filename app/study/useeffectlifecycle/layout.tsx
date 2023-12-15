import { context } from "@nextspace/server/request"
import TheLayout from "./TheLayout"


export default async function layout({ children }: { children: React.ReactNode }) {
    console.log("layout useeffectlifectycle body")

    console.log("layout useeffectlifectycle request context", context())

    return <div>
        [layout useeffectlifectycle]
        <TheLayout>
            {children}
        </TheLayout>
        [/layout useeffectlifectycle]
    </div>

}