import { Module } from "@nestjs/common";
import { SpellingService } from "./spelling.service";
import {
    SpellingBeanCapitalizedService,
    SpellingBeanEndPointService,
    SpellingCommaBeanService,
    SpellingOfflineBeanService,
    SpellingYaSpellerBeanService,
} from "./beans";
import { HttpModule } from "@nestjs/axios";
import { ISpellingBean } from "./beans/spelling-beans.model";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [
        SpellingService,
        SpellingBeanCapitalizedService,
        SpellingCommaBeanService,
        SpellingBeanEndPointService,
        SpellingOfflineBeanService,
        SpellingYaSpellerBeanService,
        {
            provide: "ISpellingBeans",
            useFactory: (...beans: ISpellingBean[]) => beans,
            inject: [
                SpellingBeanCapitalizedService,
                SpellingCommaBeanService,
                SpellingBeanEndPointService,
                SpellingOfflineBeanService,
                SpellingYaSpellerBeanService,
            ],
        },
    ],
    exports: [
        SpellingService,
        "ISpellingBeans",
        SpellingBeanCapitalizedService,
        SpellingCommaBeanService,
        SpellingBeanEndPointService,
        SpellingOfflineBeanService,
        SpellingYaSpellerBeanService,
    ],
})
export class SpellingModule {}
