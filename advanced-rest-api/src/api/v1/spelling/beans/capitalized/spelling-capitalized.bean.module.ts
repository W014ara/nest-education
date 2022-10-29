import { Module } from "@nestjs/common";
import { SpellingBeanCapitalizedService } from "./spelling-capitalized.bean.service";

@Module({
    imports: [],
    controllers: [],
    providers: [SpellingBeanCapitalizedService],
    exports: [SpellingBeanCapitalizedService],
})
export class SpellingCapitalizedBeanModule {}
