import { Sequelize, Model, DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

/* export interface Candle {
    currency:string
    finalDateTime:Date
    open:number
    close:number
    high:number
    low:number
    color:string
} */

export class Candle extends Model {}

Candle.init({
    currency:DataTypes.STRING,
    finalDateTime:DataTypes.DATE,
    open:DataTypes.NUMBER,
    close:DataTypes.NUMBER,
    high:DataTypes.NUMBER,
    low:DataTypes.NUMBER,
    color:DataTypes.STRING
},{sequelize,modelName:'Candle'})

sequelize.sync();

