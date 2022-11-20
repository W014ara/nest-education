import {Module, Logger} from '@nestjs/common';
import {PrometheusModule, makeCounterProvider} from "@willsoto/nestjs-prometheus";
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BROKER_URL, BROKER_PROVIDE_NAME} from './app.constants';

const amqp = require("amqplib");

const logger = new Logger(AppService.name);

@Module({
    imports: [PrometheusModule.register()],
    controllers: [AppController],
    providers: [AppService, {
        provide: BROKER_PROVIDE_NAME,
        useFactory: async () => {
            const connection = await amqp.connect(BROKER_URL);

            if (connection) {
                logger.log("Connection to broker complete!")
                return connection;
            }
        },
    },
        makeCounterProvider({
        name: "post_message",
        help: "POST COUNTER MESSAGES",
    }),
        makeCounterProvider({
            name: "get_message",
            help: "GET COUNTER MESSAGES",
        }),
    ],
})
export class AppModule {
}
