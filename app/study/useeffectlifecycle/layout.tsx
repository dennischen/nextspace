import TheLayout from "./TheLayout"


export default function layout({ children }: { children: React.ReactNode }) {
    console.log("layout useeffectlifectycle body")

    return <div>
        [layout useeffectlifectycle]
        <TheLayout>
            {children}
        </TheLayout>
        [/layout useeffectlifectycle]
    </div>

}