/*
 * @file-created: 2023-10-26
 * @author: Dennis Chen
 */
import { ProgressIndicator } from '@nextspace/types'
import type { NProgress } from 'nprogress'

export default class NProgressIndicator implements ProgressIndicator {
    private delay: number

    private count = 0;

    private nprogress: NProgress

    private timer?: any

    constructor(nprogress: NProgress, { delay = 500}: { delay?: number } = {}) {
        this.nprogress = nprogress
        this.delay = delay
    }

    get loading() {
        return this.count > 0
    }

    start = () => {
        const { nprogress, delay } = this
        this.count++

        if (this.count > 1) {
            return
        }

        if (delay > 0) {
            this.timer = setTimeout(() => {
                //still showing
                if (this.count > 0) {
                    nprogress.start()
                }
            }, delay)
        } else {
            nprogress.start()
        }


    }
    stop = (force?: boolean) => {
        const { nprogress } = this
        this.count--

        if (!force && this.count > 0) {
            return
        }
        if (force || this.count < 0) {
            this.count = 0
        }
        nprogress.done(force)
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = undefined
        }
    }
}