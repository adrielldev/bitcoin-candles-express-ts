import { config } from "dotenv";

import { Channel,connect } from "amqplib";
export const createMessageChannel = async ():Promise<Channel|null> => {
    config()
    try {
        const connection = await connect(process.env.AMQP_SERVER!)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.QUEUE_NAME!)
        console.log('Connected with RabbitMQ')

        return channel

    } catch (error) {
        console.log('Error while trying to connect with rabbitMQ')
        return null
    }
}