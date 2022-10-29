import { Injectable } from "@nestjs/common";
import { ISpellingBean } from "../spelling-beans.model";

@Injectable()
export class SpellingCommaBeanService implements ISpellingBean {
    /**
     * Method for checking that there is a space after each comma in the text
     * @param str - input string param
     * @private
     */
    public async spellCheck(str: string): Promise<boolean> {
        const findCommaPatter = new RegExp(/,/g);
        const findSpacesPatter = new RegExp(/,\s/g);

        return (str.match(findCommaPatter) || []).length === (str.match(findSpacesPatter) || []).length;
    }
}
