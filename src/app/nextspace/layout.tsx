
import './nextspace.scss'
import nextspaceStyles from "./nextspace.module.scss"

//don't use static-page for all page under nextspace
export const dynamic = 'force-dynamic'

export type LayoutProps = {
    children: React.ReactNode
}

export default function NextspaceLayout({ children }: LayoutProps) {
    return <div className={nextspaceStyles.layout}>
        {children}
    </div>
}