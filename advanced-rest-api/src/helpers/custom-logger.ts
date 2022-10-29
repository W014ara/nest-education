export const logger = <T>(title: string, msg: T): void => {
    console.log(`[Custom Logger]: ${title}: ${msg}`);
};
