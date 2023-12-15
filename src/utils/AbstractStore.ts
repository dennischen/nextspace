/*
 * @file-created: 2023-12-12
 * @author: Dennis Chen
 */

import { Store } from "@nextspace/types"


export default abstract class AbstractStore<S = any> implements Store<S>{

    private listeners: (() => void)[] = [];

    protected state: S

    constructor(state?: S) {
        this.state = state || {} as S
    }

    setState(newState?: S) {
        if (!Object.is(this.state, newState)) {
            this.state = newState || {} as S
            this.emit()
        }
    }

    //use arrow method to prevent calling this undefinded whe passing subscribe and getSnapshot fuction
    subscribe = (listener: () => void) => {
        this.listeners = [...this.listeners, listener]
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener)
        }
    }

    //use arrow method to prevent calling this undefinded whe passing subscribe and getSnapshot fuction
    getSnapshot = () => {
        return this.state
    }

    protected emit() {
        for (let l of this.listeners) {
            l()
        }
    }


}