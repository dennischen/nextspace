'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */
import { MyThemepack } from "@/types"
import useI18n from "@nextspace/useI18n"
import useThemepack from "@nextspace/useThemepack"
import useWorkspace from "@nextspace/useWorkspace"
import Image from "next/image"

export default function ThemeSwitcher({ id = 'test1' }: { id?: string }) {
    const workspace = useWorkspace()
    const i18n = useI18n()
    const { styles, dark, images, utils, variables } = useThemepack() as MyThemepack
    const { themes, theme } = workspace


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