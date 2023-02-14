import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@core/DOM";
import { DOMEvent } from "@core/types";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root:DOM) {
        super($root, {
            name:'Formula',
            listeners:['click']
        });
    }
    toHTML(): string {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onInput(event:DOMEvent<HTMLDivElement>){
    }

    onClick(event:DOMEvent<HTMLDivElement>){
    }

}