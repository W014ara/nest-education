import { Injectable } from "@nestjs/common";
import spell = require("spell-checker-js");
import { ISpellingBean } from "../spelling-beans.model";

@Injectable()
export class SpellingOfflineBeanService implements ISpellingBean {
    /**
     * Method for checking that text valid via offline spell checker (https://github.com/danakt/spell-checker.js)
     * @param str - input string param
     * @private
     */
    public async spellCheck(str: string): Promise<boolean> {
        spell.load("ru");
        return spell.check(str).length <= 0;
    }
}
