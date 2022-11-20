import {Inject, Injectable, Logger} from '@nestjs/common';
import {BROKER_PROVIDE_NAME} from "./app.constants";
import {Counter} from "prom-client";
import {InjectMetric} from "@willsoto/nestjs-prometheus";

@Injectable()
export class AppService {
    constructor(@Inject(BROKER_PROVIDE_NAME) private connection,
                @InjectMetric("get_message") public getCounter: Counter<string>,
                @InjectMetric("post_message") public postCounter: Counter<string>) {
    }


    private readonly logger = new Logger(AppService.name);

    /**
     * Get endpoint that returns the last message from the desired queue
     * @param queue - the name of the queue from where you want to get the last message
     */
    public async getLast(queue: string): Promise<string> {
        const channel = await this.connection.createChannel();

        await channel.assertQueue(queue, {
            durable: true,
        });

        const msgGet = await channel.get(queue, {noAck: false});

        if (msgGet && msgGet.content) {
            const msg = msgGet.content.toString();

            this.logger.debug(`Last message from queue '${queue}': ${msg}`)

            channel.ack(msgGet);
            this.getCounter.inc(1);
            return msg;
        } else {
            this.logger.warn(`No messages in '${queue}' queue`)
            return "error";
        }
    }

    /**
     * Post request, sent to the desired queue, a parameter that specifies via the request body as a string
     * @param queue - The name of the queue to send the message to. Set as url
     * @param msg
     */
    public async sendToQueue(queue: string, msg: string) {
        const channel = await this.connection.createChannel();

        await channel.assertQueue(queue, {
            durable: true,
        });

        await channel.sendToQueue(queue, Buffer.from(msg));

        this.postCounter.inc(1);

        this.logger.debug(`Message send to queue '${queue}' successfully with param: ${msg}`)
    }
}
