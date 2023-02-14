import { ExcelComponent } from "@core/ExcelComponent";
import { DOM } from "@core/DOM";
import { DOMEvent } from "@core/types";

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'
    constructor($root:DOM) {
        super($root,{
            name:"Toolbar",
            listeners:['click']
        });
    }

    toHTML(): string {
        return `
         <div class="button">
                <span class="material-symbols-outlined">format_align_left</span>
            </div>
            <div class="button">
                <span class="material-symbols-outlined">format_align_center</span>
            </div>
            <div class="button">
                <span class="material-symbols-outlined">format_align_right</span>
            </div>
            <div class="button">
                <span class="material-symbols-outlined">format_bold</span>
            </div>
            <div class="button">
                <span class="material-symbols-outlined">format_italic</span>
            </div>
            <div class="button" >
                <span class="material-symbols-outlined">format_underlined</span>
            </div>`
    }
    onClick(event:DOMEvent<HTMLDivElement>){
        console.log(event.currentTarget)
    }
}