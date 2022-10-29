import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { SpellingModule } from "./v1/spelling/spelling.module";
import { SpellingService } from "./v1/spelling/spelling.service";

@Module({
    imports: [SpellingModule],
    providers: [
        {
            provide: "ISpellingService",
            useClass: SpellingService,
        },
    ],
    controllers: [ApiController],
})
export class ApiModule {}
