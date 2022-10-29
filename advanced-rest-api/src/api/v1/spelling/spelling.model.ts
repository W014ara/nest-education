export type spellingModel = string;

export interface ISpellingService {
    checkByName(str, name): Promise<string | boolean>;

    check(str): Promise<string>;
}
