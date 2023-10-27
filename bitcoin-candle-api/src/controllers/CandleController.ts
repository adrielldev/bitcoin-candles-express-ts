import {Candle} from '../models/CandleModel'


export default class CandleController {
    async save(candle:any):Promise<Candle> {
        const newCandle = await Candle.create(candle)
        return newCandle
    }

    async findLastCandles(quantity:number):Promise<Candle[]> {
        const n = quantity > 0 ? quantity : 10
        const lastCandles = await Candle.findAll()

        return lastCandles.reverse().slice(0,3)
    }
    
}