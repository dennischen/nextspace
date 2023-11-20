/*
 * @file-created: 2023-10-26
 * @author: Dennis Chen
 */
import { ProgressIndicator } from '@nextspace/types'

import spin from '@nextspace/assets/spin.svg'


const INDICATOR_CLASS_NAME = 'nextspace-spi'

export default class SimpleProgressIndicator implements ProgressIndicator {

    private container?: HTMLElement

    private delay: number

    private count = 0;

    private size;

    private indicator?: HTMLElement

    private timer?: any

    constructor({ container, size = 32, delay = 500 }: { container?: HTMLElement, delay?: number, size?:number } = {}) {
        this.container = container || typeof document === 'undefined' ? undefined : document.body
        this.size = size
        this.delay = delay
    }

    get loading() {
        return this.count > 0
    }

    start = () => {
        const { container, delay, size } = this
        this.count++

        if (this.count > 1) {
            return
        }

        if (!container) {
            console.log("Progress started at ", new Date())
        } else if (!this.indicator) {
            const indicator = this.indicator = document.createElement("div")
            indicator.className = INDICATOR_CLASS_NAME
            if (delay > 0 && !this.timer) {
                indicator.className += ' hide'
                this.timer = setTimeout(() => {
                    //still showing
                    if (this.indicator) {
                        this.indicator.className = INDICATOR_CLASS_NAME
                    }
                }, delay)
            }

            indicator.innerHTML = `<img src="${spin.src}" width="${size}px" height="${size}px"/>`

            container.appendChild(indicator)
        }


    }
    stop = (force?: boolean) => {
        const { container } = this
        this.count--

        if (!force && this.count > 0) {
            return
        }
        if (force || this.count < 0) {
            this.count = 0
        }

        if (!container) {
            console.log("Progress ended at ", new Date())
        } else if (this.indicator) {
            container.removeChild(this.indicator)
            this.indicator = undefined
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = undefined
            }
        }
    }
}