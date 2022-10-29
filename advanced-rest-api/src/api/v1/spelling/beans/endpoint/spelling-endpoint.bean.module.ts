import { Module } from "@nestjs/common";
import { SpellingBeanEndPointService } from "./spelling-endpoint.bean.service";

@Module({
    imports: [],
    controllers: [],
    providers: [SpellingBeanEndPointService],
    exports: [SpellingBeanEndPointService],
})
export class SpellingEndpointBeanModule {}
