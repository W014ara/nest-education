import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { YA_PUBLIC_GATEWAY } from "./spelling-yaSpeller.constants";
import { HttpService } from "@nestjs/axios";
import { ISpellingBean } from "../spelling-beans.model";

@Injectable()
export class SpellingYaSpellerBeanService implements ISpellingBean {
    constructor(protected readonly httpService: HttpService) {}

    /**
     * Method for online dictionary check
     * @param str - input string param
     */
    public async spellCheck(str): Promise<boolean> {
        // text preprocessing for yandex API
        const dataText = str.replace(/ /g, "+");

        const response = await firstValueFrom(
            this.httpService.get(`${YA_PUBLIC_GATEWAY}/checkText`, {
                params: {
                    text: dataText,
                },
            })
        );

        return (response.data as []).length <= 0;
    }
}
