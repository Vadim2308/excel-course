import { DOMListener } from '@core/DOMListener';
import { DOM } from "@core/DOM";

interface Payload {
  name:string
  listeners:string[]
}

export class ExcelComponent extends DOMListener {
  name:string
  constructor($root:DOM,options?:Payload ) {
    super($root,options?.listeners);
    this.name = options?.name || ''
  }
  toHTML() {
    return '';
  }

  init(){
    this.initDOMListeners()
  }
  destroy(){
    this.removeDOMListeners()
  }
}