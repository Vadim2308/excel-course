import type { ExcelOptions } from "@/components/excel/types";
import { $, DOM } from "@core/DOM";
import { ExcelComponent } from "@core/ExcelComponent";

export class Excel {
    $el:DOM
    components
    private instances:ExcelComponent[]
    constructor(selector:string, options:ExcelOptions) {
        this.$el = $(selector)
        this.components = options?.components || []
    }
    getRoot(){
        const $root = $.create('div','excel')
        this.instances = this.components.map(Component => {
            const $el = $.create('div',Component.className || '')
            const instance = new Component($el)
            // DEBUG
            // if(instance.name){
            //     // @ts-ignore
            //     window["c" + instance.name] = instance
            // }
            $el.html(instance.toHTML())
            $root.append($el)
            return instance
        })

        return $root
    }
    render() {
        this.$el.append(this.getRoot())
        this.instances.forEach(component=>component.init())
    }
}
