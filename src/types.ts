import { ExcelComponent } from "@core/ExcelComponent";

export type BaseClass = typeof ExcelComponent & {
    className?:string
}