import { Module } from "@nestjs/common";
import { SpellingYaSpellerBeanService } from "./spelling-yaSpeller.bean.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [],
    providers: [SpellingYaSpellerBeanService],
    exports: [SpellingYaSpellerBeanService],
})
export class SpellingYaSpellerModule {}
