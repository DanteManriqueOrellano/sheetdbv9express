import {SheetEntry} from '../typesSheet'
import sheetData from './sheets.json'

const diaries: Array<SheetEntry> = sheetData as Array<SheetEntry>

export const getEntries = ():SheetEntry[] => diaries

export const findById = (id:number):SheetEntry | undefined=>{
    const entry = diaries.find(d=>d.id === id)
    return entry

}


export const addEntry = (insumo:string,umedida:string, categoria:string):
SheetEntry => {
    const newDiaryEntry = {
        id:Math.max(...diaries.map(d=>d.id))+1,
        insumo,
        umedida,
        categoria,        
    }

    diaries.push(newDiaryEntry)
    
    return newDiaryEntry
}
