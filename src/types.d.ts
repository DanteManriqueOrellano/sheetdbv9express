export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export type Visibility = 'great' | 'good' | 'ok' | 'poor'
export interface DiaryEntry {
    id:number,
    date:string,
    weather:Weather,
    visibility: Visibility,
    comment:string
}
interface SpecialDiaryEntry extends DiaryEntry {
    flightNumber: number
}

type SpecialDiaryEntry2 = DiaryEntry & {
    flightNumber:number
}

export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry,'id' | 'date' | 'weather' | 'visibility'>

export type NonSensitiveInfoDiaryEntry2 = Omit<DiaryEntry,'comment'>
