import { Channel, connect } from 'amqplib'
import {config} from 'dotenv'
import CandleController from '../controllers/CandleController'
import { Server } from 'socket.io'
import http from 'http'
import { Candle } from '../models/CandleModel'

config()

export default class CandleMessageChannel {
    private _channel:any = null
    private _candleCtrl:CandleController
    private _io: Server

    constructor(server:http.Server){
        this._candleCtrl = new CandleController()
        this._io = new Server(server,{
            cors:{
                origin:process.env.SOCKET_CLIENT_SERVER,
                methods:["GET","POST"]
            }
        })
        this._io.on('connection',()=>{
            console.log('Web socket connected')
        })
        this._createMessageChannel()
    }

    private async _createMessageChannel(){
        try {
            const connection = await connect(process.env.AMQP_SERVER!)
            this._channel = await connection.createChannel()
            this._channel.assertQueue(process.env.QUEUE_NAME!)
        } catch (error) {
            console.log('Connection to RabbitMQ Failed')
            console.log(error)
        }
    }

    async consumeMessages(){
        await this._createMessageChannel()
        if(this._channel){
            this._channel.consume(process.env.QUEUE_NAME!,async (msg:any) => {
            const candleObj = JSON.parse(msg.content.toString())
            console.log('Mensagem recebida')
            console.log(candleObj)
            //this._channel.ack(msg)
            const candle:Candle = candleObj
            this._candleCtrl.save(candle)
            console.log('Candle saved to database')
            this._io.emit(process.env.SOCKET_EVENT_NAME!,candle)
            console.log('Candle emitted via websocket')
        })
        }
        
        console.log('Candle consumer started')
    }
}