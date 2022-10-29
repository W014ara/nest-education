import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import express = require("express");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("../config");

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    await app.listen(config.port);
}

bootstrap().then(result => result);
