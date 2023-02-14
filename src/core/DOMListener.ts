import { DOM } from "@core/DOM";
import { capitalize } from "@core/utils";

const getMethodName = (eventName:string) => `on${capitalize(eventName)}`

export class DOMListener {
    $root
    listeners
    constructor($root:DOM, listeners:string[] = []) {
        if(!$root){
            throw new Error(`No $root provided for DOMListener`)
        }
        this.$root = $root
        this.listeners = listeners
    }
    initDOMListeners(){
        this.listeners.forEach(listener=> {
            const method = getMethodName(listener) as keyof typeof this
            if(!this[method]){
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const name = this.name || '' as string
                throw new Error(`Method ${String(method)} is not implemented in ${name} component`)
            }
            // eslint-disable-next-line @typescript-eslint/ban-types
            const callback = (this[method] as Function).bind(this)
            this[method] = callback
            this.$root.on(listener,callback as ()=>void)
        })
    }
    removeDOMListeners(){
        this.listeners.forEach(listener => {
            const method = getMethodName(listener) as keyof typeof this
            this.$root.off(listener,this[method] as ()=>void)
        })

    }
}