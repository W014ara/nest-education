import {Controller, Get, Post} from '@nestjs/common';
import {AppService} from "./app.service";
import {BROKER_QUEUE, BROKER_SECOND_QUEUE} from "./app.constants";
import {PlainBody} from "./helpers/plainbody.decorator";

@Controller()
export class AppController {
    constructor(private appService: AppService) {
    }

    @Get('api/generator/last')
    public async getHello(): Promise<string> {
        return await this.appService.getLast(BROKER_SECOND_QUEUE);
    }

    @Post('api/generator/new')
    async publishToQueue(@PlainBody() msg: string) {
        await this.appService.sendToQueue(BROKER_QUEUE, msg);
    }
}
