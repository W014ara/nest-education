import * as rawBody from "raw-body";
import {BadRequestException, createParamDecorator, ExecutionContext} from "@nestjs/common";

// We need this controller cause NestJS does not appear to plain/text param
export const PlainBody = createParamDecorator(async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<import("express").Request>();
    if (!req.readable) {
        throw new BadRequestException("Invalid body");
    }

    return (await rawBody(req)).toString("utf8").trim();
});
