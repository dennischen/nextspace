'use client'
import { MyThemepack } from "@/types"
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */
import WorkspaceHolder from "@nextspace/contexts/workspace"
import Image from "next/image"
import { useContext } from "react"

export default function ThemeSwitcher({ id = 'test1' }: { id?: string }) {
    const workspace = useContext(WorkspaceHolder)
    const { themes, theme, i18n } = workspace
    const { styles, dark, images, utils, variables } = workspace.themepack as MyThemepack

    const onChangeTheme = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        workspace.changeTheme(evt.target.value)
    }

    return <div>
        <select id={id} name="theme" defaultValue={theme} onChange={onChangeTheme}>
            {themes.map(theme => <option key={theme} value={theme}>{i18n.l(`${theme}`)}</option>)}
        </select>
        <div id="d1" className={styles.className1}>
            <p id="p1">{theme}</p>
            <p id="p2">{!!dark ? 'True' : 'False'}</p>
            <p id="p3">{images.image1}</p>
            <p id="p4" style={styles.innerStyle1}></p>
            <p id="p5">{utils.toPx(variables.imageWidth1)}</p>
        </div>
        <Image id="img1" alt="" src={images.image1} width={variables.imageWidth1} height={variables.imageWidth1} />
    </div>
}