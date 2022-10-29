import { Inject, Injectable } from "@nestjs/common";

import { ISpellingService } from "./spelling.model";
import { ISpellingBean } from "./beans/spelling-beans.model";

@Injectable()
export class SpellingService implements ISpellingService {
    constructor(@Inject("ISpellingBeans") private readonly spellingService: ISpellingBean[]) {}

    /**
     * Resulting string validation method via any beans
     * @param str - input string param
     */
    public async check(str): Promise<string> {
        if (!str) {
            return `100%`;
        }

        const targetPromiseArr = this.spellingService.map(async bean => {
            return Number(await bean.spellCheck(str));
        });

        const totalSum = await Promise.all([...targetPromiseArr]).then(values => {
            return values.map(el => Number(el)).reduce((partialSum, next) => partialSum + next, 0);
        });

        return `${(totalSum / targetPromiseArr.length) * 100}%`;
    }

    /**
     * Resulting string validation method with url page name
     * @param str - input string param
     * @param name - url page name
     */
    public async checkByName(str, name): Promise<string | boolean> {
        if (!str) {
            return `100%`;
        }

        for (const bean of this.spellingService) {
            const beanName = bean.constructor.name;
            switch (name) {
                case "endpoint":
                    if (beanName === "SpellingBeanEndPointService") return bean.spellCheck(str);
                    break;
                case "capitalized":
                    if (beanName === "SpellingBeanCapitalizedService") return bean.spellCheck(str);
                    break;
                case "comma":
                    if (beanName === "SpellingCommaBeanService") return bean.spellCheck(str);
                    break;
                case "offline":
                    if (beanName === "SpellingOfflineBeanService") return bean.spellCheck(str);
                    break;
                case "yandex":
                    if (beanName === "SpellingYaSpellerBeanService") return bean.spellCheck(str);
                    break;
                default:
                    return this.check(str);
            }
        }
    }
}
