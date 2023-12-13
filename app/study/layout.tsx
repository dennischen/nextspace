import TheLayout from "./TheLayout"


export default function layout({ children }: { children: React.ReactNode }) {
    console.log("layout study body")

    return <div>
        [layout study]
        <TheLayout>
            {children}
        </TheLayout>
        [/layout study]
    </div>

}