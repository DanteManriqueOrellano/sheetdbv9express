import express from 'express'
import * as sheetServices from '../services/sheetServices'
import { GoogleSpreadsheet, ServiceAccountCredentials } from 'google-spreadsheet';
const router = express.Router()
const {doc1,credentials1} = {doc1:"1ASj5e0N7o50GqYeJTDY2QSgNA8ZmrdtdG0SO7D3XO7Q",credentials1:{
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC79EZLvGaZgqLe\n1I4boyNeW9AvlH48c/0LvIWSHuO33gf8lxcFH/08CSGmVlqJLEcHohKyYLTlYzrZ\nDJ+ARUsl+UAugSGxwfQQRZLCiE05QSBsrNCqGn5dhN4hQLOHNqUzo7pYvqoj+4tU\nVwtrvxv4S96A/TiMv3PDZweaIcQQNEZ6zl59dR/M/xRSciQFnJ7VCk2WlgQWyF21\nJugKPt6Oc+z7E0kcRpM1zCW+9jdrV+6ALyddSDDUYBgOYPkw/FFYLNY+nGN3BeMR\n28naPcoW85Febmw9hrFrzJqwN1qPTrB0XuGUj2n3Kqh6AW98Vit0AUr/WeIrloAF\n+4unhTIrAgMBAAECggEAGqidld1tkgV483EjjOD5Qcd1AmKl+w4ajKEbMuwFsY0h\nBd8qSTRN10eWScECy2UH2BnRXBKiZczKyoFjWC6753FwfIgdTtirNOmhVM0/YskN\nf8yNNitW1A3l8cJ7FEkYanglFLRKbpsdmoNUH9616WRddV81N6VqFoOVDPQQGpoJ\nPRr1MUr46HZE/kL+Azz/ZA2/HxXZTm0vCAPK1ElMUya5BsPD1kbJ0nfX3e5mjTK0\n5QZ5rTAbKQ+Da5IUL9VQiSWWX5UfCFE9Vl2kXIxFJqhvHyR304dbSL7KsbLJ0FjN\n7TJHfT2U/iNlI3FV/nHuswk/zCq2JhCw2aYSbUOT0QKBgQDmtAfRw1go0uUsflMH\n4kssK2tKba3RmFI1Vih/Q+KyYQ3Iq9LTXZspkpXjGO9w/WALtW5R56mDpFf0wj8W\n2kYI7+SUJ07tZvMsaIcFCzjDh++uhjXuECUjFuzL6UwcC/BH9XjJ/Ouz4f1iMRA0\nNVZ+MppAmvoDTi9nqJcmxmZo2wKBgQDQkEEb9Ou0HHPk+jI+KFSHYprc2yJhAHci\n9DYkJHmmu49rcj9T9zFBXd/7PjTPHaPivoryI1l1WGMeE4J8861rIvlTzvfnhDBb\nNhb2WSheNRSN020b+5VWM6ieaqxpLtg5iiSvmZfHqTxxC6qCkjoSYkz6dl8sYgbp\n0AC83HA08QKBgQCCDcFOtfGv6du5rmj+S8qW1s9AAP545oaJfM2NmOZmKqJLmtlZ\nwC4lTHZktHze1GddkmTjlVYRWQcgepR4PIo4pYvVHSe4W04AndhntoDEcZBjcVNb\npgxZcKYC+bynHu/QkQgLziHNoTtnLEN3Ow5MTBh7DSKd1GiS5g53lGbM+wKBgDrx\nqhUWoU7kA7UhKPX8O/ePXKkynYLAuOr+Dhck3+TJeX0qas92O0t4FodRS2eFvv2k\nUGyipPPPKSQk62oZDFgNKF4RTmr2JxyAKvkwtYH6inaS3HFeJxSXwP4Us+l+Pcn1\nSuz+AbGCGPzyCRyh6xurAIqAzeEjS0Tlbm/x9RxhAoGBAMy1/S0BREC32tXuIU1X\ndL2Pm6MDhfUJWa7UaxkKwx5p6efzsS3ocMShEAaZG4mZTXnU2HkifA0jTcpzcsQN\ntpU4fSDKDuETghaA3vSwWt+CCg7DnyYP8F33WPz1MKKZMYm0PU08bVxarWE9yjeC\nCKL7HE5JPpKJfC8hMvDM/yig\n-----END PRIVATE KEY-----\n",//String(process.env.GOOGLE_PRIVATE_KEY),
    "client_email": "googleserviceaccountaquasinfac@aquasinfactura.iam.gserviceaccount.com"
  }}
const doc:GoogleSpreadsheet = new GoogleSpreadsheet(doc1);
const credentials:ServiceAccountCredentials = credentials1;
  
export enum u_medida {
    UND = "UND",
    KG = "KG",
    BOL = "BOL",//BOLSA
    M = "M",
    M2 = "M2",
    M3 = "M3",
    GLB = "GLB",
    MES = "MES",
    GAL = "GAL",
    PZA = "PZA",//PIEZA
    PLN = "PLN",//PLANCHA
    P2 = "P2",
    PLG = "PLG",//PLIEGO
    RLL = "RLL",//ROLLO
    MLL = "MLL",//MILLAR
    DIA = "DIA",
    GR = "GR",//GRAMO
    LT = "LT",//LITRO
    VAR= "VAR",//VARILLA
    PAR = "PAR",
    CAJ="CAJ",//CAJA

}
export interface InsumoGlobalModel {
    id:string
    insumo: string;
    umedida?: u_medida;
    categoria: string
}

router.get('/',async (req,res)=>{
    
    await doc.useServiceAccountAuth(credentials); 
            await doc.loadInfo();
                const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
                const rows = await sheet.getRows();
                const listaInsumo:InsumoGlobalModel[] =	[]
                for(let i =0;i<rows.length;i++){
                    listaInsumo.push({
                        id:rows[i].codigo,
                        insumo:rows[i].insumo,
                        umedida:rows[i].umedida,
                        categoria:rows[i].categoria
                    })
                }
                console.log(req.params)
                res.send( listaInsumo)
    
})

/*router.get('/:id',(req,res)=>{
    const diary = diaryServices.findById(+req.params.id)

    return (diary != null)
    ?  res.send(diary)
    : res.sendStatus(404        )
})*/

router.post('/newrow',(req,res)=>{
    
    const {insumo,umedida,categoria} = req.body

    const newRowEntry = sheetServices.addEntry(
        insumo,
        umedida,
        categoria,
        
    )

    res.json(newRowEntry)
})
export default router