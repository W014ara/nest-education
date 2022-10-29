import { Injectable } from "@nestjs/common";
import { IQueueConfig, IQueueDictMsg } from "./app.model";

const amqp = require("amqplib");

@Injectable()
export class AppService {
   private lastMsg: string;
   private msgFromQueue: IQueueDictMsg = {};

   getLastMessage() {
      return this.lastMsg;
   }

   setLastMessage(msg: string) {
      this.lastMsg = msg;
   }

   getMessages() {
      return this.msgFromQueue;
   }

   setMessages(queue: string, msg: string) {
      if (this.msgFromQueue[queue]) {
         this.msgFromQueue[queue].push(msg);
      } else {
         this.msgFromQueue[queue] = [];
         this.msgFromQueue[queue].push(msg);
      }
   }

   public async sendMessageToQueue(config: IQueueConfig): Promise<string> {
      const conn = await amqp.connect(config.url);
      const channel = await conn.createChannel();
      const secondChannel = await conn.createChannel();

      await channel.assertQueue(config.queue, {
         durable: config.durable,
      });

      await secondChannel.assertQueue("unlisted-queue", {
         durable: config.durable,
      });

      await channel.sendToQueue(config.queue, Buffer.from(config.msg));
      await secondChannel.sendToQueue("unlisted-queue", Buffer.from(config.msg));

      console.log(`Message send successfully with param: ${config.msg}`);

      setTimeout(() => {
         conn.close();
      }, config.closeConTime);

      return config.msg;
   }

   public async getLast(config: IQueueConfig): Promise<string> {
      const self = this;
      config.noAck = false;

      const conn = await amqp.connect(config.url);

      const channel = await conn.createChannel();

      await channel.assertQueue(config.queue, {
         durable: config.durable,
      });

      const msgGet = await channel.get(config.queue, { noAck: config.noAck });

      const msg = msgGet.content.toString();

      console.log(`Last message from queue '${config.queue}': ${msg}`);
      self.setLastMessage(msg);

      channel.ack(msgGet);

      setTimeout(() => {
         conn.close();
      }, config.closeConTime);

      return self.getLastMessage();
   }

   public async getAllMsg(config: IQueueConfig): Promise<IQueueDictMsg> {
      const self = this;

      const conn = await amqp.connect(config.url);
      const channel = await conn.createChannel();

      await channel.assertQueue(config.queue, {
         durable: config.durable,
      });

      await channel.consume(
         config.queue,
         msg => {
            if (msg !== null) {
               const consumedMsg = msg.content.toString();

               self.setMessages(config.queue, consumedMsg);
               channel.ack(msg);
            } else {
               console.log("Consumer cancelled by server");
            }
         },
         [
            {
               noAck: config.noAck,
            },
         ]
      );

      setTimeout(() => {
         conn.close();
      }, config.closeConTime);

      return this.getMessages();
   }
}
