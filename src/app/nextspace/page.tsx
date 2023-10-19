
import BlankTemplate from "./_/templates/Blank"
import nextspaceStyles from "./nextspace.module.scss"


type PageProps = {
    children: React.ReactNode
}

export default function NextspacePage({ children }: PageProps) {
    return <div className={nextspaceStyles.page}>
        <BlankTemplate>
            Nextspace
        </BlankTemplate>
    </div>
}