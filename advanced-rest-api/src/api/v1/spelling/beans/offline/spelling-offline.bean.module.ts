import { Module } from "@nestjs/common";
import { SpellingOfflineBeanService } from "./spelling-offline.bean.service";

@Module({
    imports: [],
    controllers: [],
    providers: [SpellingOfflineBeanService],
    exports: [SpellingOfflineBeanService],
})
export class SpellingOfflineBeanModule {}
