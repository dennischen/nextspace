/*
 * @file-created: 2023-10-26
 * @author: Dennis Chen
 */
import { ProgressIndicator } from '@/nextspace/types'
import type { NProgress } from 'nprogress'

export default class NProgressIndicator implements ProgressIndicator {
    private delay: number

    private count = 0;

    private show = false;

    private nprogress: NProgress

    constructor(nprogress: NProgress, { delay }: { delay?: number } = {}) {
        this.nprogress = nprogress
        this.delay = delay || 500

    }

    start = () => {
        const { nprogress, count, delay } = this
        this.count = count + 1

        if (count > 0) {
            return
        }

        this.show = true
        if (delay > 0) {
            setTimeout(() => {
                //still showing
                if (this.show) {
                    this.nprogress.start()
                }
            }, delay)
        } else {
            this.nprogress.start()
        }


    }
    end = () => {
        const { nprogress, count } = this
        this.count = count - 1

        if (count > 1) {
            return
        }

        this.show = false
        this.nprogress.done()
    }
}