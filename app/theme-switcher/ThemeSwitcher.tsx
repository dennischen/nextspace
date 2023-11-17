'use client'
/*
 * @file-created: 2023-11-06
 * @author: Dennis Chen
 */
import { MyThemepack } from "@/types"
import useI18n from "@nextspace/useI18n"
import useTheme from "@nextspace/useTheme"
import Image from "next/image"

export default function ThemeSwitcher({ id = 'test1' }: { id?: string }) {
    const i18n = useI18n()
    const theme = useTheme()
    const { styles, dark, images, utils, variables } = theme.themepack as MyThemepack
    const { codes, code } = theme


    const onChangeTheme = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        theme.changeTheme(evt.target.value)
    }

    return <div>
        <select id={id} name="theme" defaultValue={code} onChange={onChangeTheme}>
            {codes.map(code => <option key={code} value={code}>{i18n.l(`${code}`)}</option>)}
        </select>
        <div id="d1" className={styles.className1}>
            <p id="p1">{code}</p>
            <p id="p2">{!!dark ? 'True' : 'False'}</p>
            <p id="p3">{images.image1}</p>
            <p id="p4" style={styles.innerStyle1}></p>
            <p id="p5">{utils.toPx(variables.imageWidth1)}</p>
        </div>
        <Image id="img1" alt="" src={images.image1} width={variables.imageWidth1} height={variables.imageWidth1} />
    </div>
}