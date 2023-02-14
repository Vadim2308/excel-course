import { DOMEvent } from "@core/types";

export class DOM {
    $el
    constructor(selector:string | HTMLElement) {
        this.$el = typeof selector === 'string' ? document.querySelector(selector) : selector
    }

    html(html:string | unknown){
        if(typeof html === 'string'){
            this.$el.innerHTML = html
        } else {
            this.$el.outerHTML.trim()
        }
        return this
    }

    clear(){
        this.html('')
        return this
    }

    on(eventType:string,callback:(event:DOMEvent<HTMLElement>)=>void){
        this.$el.addEventListener(eventType,callback)

    }
    off(eventType:string,callback:(event:DOMEvent<HTMLElement>)=>void){
        this.$el.removeEventListener(eventType,callback)
    }

    append(node:DOM | Node){
        let nativeNode
        if(node instanceof DOM){
            nativeNode = node.$el
        }
        if(Element.prototype.append){
            this.$el.append(nativeNode)
        } else {
            this.$el.appendChild(nativeNode)
        }
        return this
    }
}

export const $ = (selector:HTMLElement | string) => {
    return new DOM(selector)
}

$.create = (tagName:string,...classes:string[]) => {
    const el = document.createElement(tagName)
    const filteredClasses = classes.filter(el=>el)
    if(filteredClasses.length){
        el.classList.add(...filteredClasses)
    }
    return $(el)
}