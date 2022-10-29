import { Injectable } from "@nestjs/common";
import { ISpellingBean } from "../spelling-beans.model";

@Injectable()
export class SpellingBeanEndPointService implements ISpellingBean {
    /**
     * Method for checking that the sent text has one dot (the last character)
     * @param str - input string param
     * @private
     */
    public async spellCheck(str: string): Promise<boolean> {
        return str[str.length - 1] === ".";
    }
}
