import { Module } from "@nestjs/common";
import { SpellingCommaBeanService } from "./spelling-comma.bean.service";

@Module({
    imports: [],
    controllers: [],
    providers: [SpellingCommaBeanService],
    exports: [SpellingCommaBeanService],
})
export class SpellingCommaBeanModule {}
