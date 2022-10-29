import { Controller, HttpCode, HttpStatus, Param, Post, Inject } from "@nestjs/common";
import { ISpellingService, spellingModel } from "./v1/spelling/spelling.model";
import { PlainBody } from "../helpers";

@Controller("api")
export class ApiController {
    constructor(@Inject("ISpellingService") private readonly SpellingService: ISpellingService) {}

    @Post("v1/spellcheck")
    public spellCheck(@PlainBody() body: spellingModel): Promise<string> {
        return this.SpellingService.check(body);
    }

    @Post("v1/spellcheck/:name")
    @HttpCode(HttpStatus.OK)
    public spellCheckByName(@Param("name") name: string, @PlainBody() body: spellingModel): Promise<string | boolean> {
        return this.SpellingService.checkByName(body, name);
    }
}
