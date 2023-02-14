const CODES = {
    A:65,
    Z:90
}

function toCell(content = '',order = 0) {
    return `
        <div data-cell-order="${order+1}" class="cell" contenteditable>${content}</div> 
    `
}

function toColumn(col:string,order = 0) {
    return `
        <div data-row-cell="${order}" class="column">${col}</div>
    `
}

function createRow(content = '', order = 0){
    return `
        <div data-row-order="${order}" class="row">
            <div data-row-info-order="${order}" class="row-info">${order || ''}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(idx:number){
   return String.fromCharCode(CODES.A + idx)
}

export const createTable = (rowsCount = 20) => {
    const colsCount = CODES.Z - CODES.A + 1
    const rows:string[] = []

    const cols = Array.from({ length:colsCount }).fill('').map((_,idx)=> {
        const char= toChar(idx)
        return toColumn(char,idx)
    }).join('')

    const tableHeader = createRow(cols)

    rows.push(tableHeader)

    const content = Array.from({ length:colsCount }).fill('').map(toCell).join('')

    for(let i = 0; i < rowsCount; i++){
        rows.push(createRow(content,i+1))
    }

    return rows.join('')
}