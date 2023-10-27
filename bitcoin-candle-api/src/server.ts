import { config } from "dotenv";
import { app } from "./app";
import CandleMessageChannel from "./messages/CandleMessageChannel";

config()
const PORT = process.env.PORT
const server = app.listen(PORT,() => console.log('Listening in 3000'))

const candleMsgChannel = new CandleMessageChannel(server)
candleMsgChannel.consumeMessages()