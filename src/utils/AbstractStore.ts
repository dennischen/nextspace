/*
 * @file-created: 2023-12-12
 * @author: Dennis Chen
 */

import { Store } from "@nextspace/types"

export default abstract class AbstractStore<S = any> implements Store<S>{
    private listeners: (()=>void)[] = [];

    subscribe(listener: ()=>void) {
        this.listeners = [...this.listeners, listener]
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener)
        }
    }

    protected emit() {
        for (let l of this.listeners) {
            l()
        }
    }

    abstract get snapshot(): S
}