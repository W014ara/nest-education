import { Injectable } from "@nestjs/common";
import { ISpellingBean } from "../spelling-beans.model";

@Injectable()
export class SpellingBeanCapitalizedService implements ISpellingBean {
    /**
     * Method for checking that text starts with a capital letter
     * @param str - input string param
     * @private
     */
    public async spellCheck(str: string): Promise<boolean> {
        return str[0] === str[0]?.toUpperCase();
    }
}
