export interface ISpellingBean {
    spellCheck(str: string): Promise<boolean>;
}
