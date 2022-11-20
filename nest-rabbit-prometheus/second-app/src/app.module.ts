import { Logger, Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BROKER_PROVIDE_NAME, BROKER_URL, BROKER_QUEUE, BROKER_SECOND_QUEUE } from "./app.constants";
import { CEZAR_SHIFT, caesarCipher } from './helpers/cezar';


const amqp = require("amqplib");

const logger = new Logger(AppService.name);

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, {
    provide: BROKER_PROVIDE_NAME,
    useFactory: async () => {
      const connection = await amqp.connect(BROKER_URL);

      if (connection) {
        logger.debug("Connection to broker complete!")
      }

      const channel = await connection.createChannel();

      await channel.assertQueue(BROKER_QUEUE, {
        durable: true,
      });

      let consumedMsg = '';

      // consume
      await channel.consume(
        BROKER_QUEUE,
        msg => {
          if (msg !== null) {
            const acceptedMsg = msg.content.toString();
            consumedMsg = caesarCipher(acceptedMsg, CEZAR_SHIFT);

            logger.debug(`Consumed msg is: '${acceptedMsg}' -> Cezar is: ${consumedMsg}`)
            channel.ack(msg);

            //send
            channel.sendToQueue(BROKER_SECOND_QUEUE, Buffer.from(consumedMsg));
            logger.debug(`Send new message ${consumedMsg} to queue ${BROKER_SECOND_QUEUE}`)
          } else {
            logger.error(`Consumer cancelled by server`)
          }
        },
        [
          {
            noAck: true,
          },
        ]
      );
    },
  }],
})
export class AppModule {}
