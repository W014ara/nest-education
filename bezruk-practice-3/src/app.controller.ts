import { Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { URL } from "./app.constants";
import { PlainBody } from "./helpers/PlainBody.decorator";
import { IQueueDictMsg } from "./app.model";
const amqp = require("amqplib/callback_api");

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

   /**
    * Post request, sent to the desired queue, a parameter that specifies via the request body as a string
    * @param queue - The name of the queue to send the message to. Set as url
    * @param body - The string message to send to the queue
    */
   @Post("v1/send/:queue")
   async publishToQueue(@Param("queue") queue: string, @PlainBody() body: string): Promise<string> {
      return this.appService.sendMessageToQueue({
         url: URL,
         queue: queue,
         msg: body,
         durable: true,
         closeConTime: 500,
      });
   }

   /**
    * Get endpoint that returns the last message from the desired queue
    * @param queue - the name of the queue from where you want to get the last message
    */
   @Get("v1/read/last/:queue")
   getLastMsgFromQueue(@Param("queue") queue: string): Promise<string> {
      return this.appService.getLast({
         url: URL,
         queue: queue,
         durable: true,
         closeConTime: 500,
      });
   }

   /**
    * Get endpoint that returns all messages from the desired queue
    * @param queue - the name of the queue from where you want to get the last message
    */
   @Get("v1/read/:queue")
   getMsgFromQueue(@Param("queue") queue: string): Promise<IQueueDictMsg> {
      return this.appService.getAllMsg({
         url: URL,
         queue: queue,
         durable: true,
         noAck: true,
      });
   }
}
