import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RmqModule } from "@app/common";
import { AUTH_SERVICE } from "./services";
import * as cookieParser from "cookie-parser";

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  exports: [RmqModule]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    console.log(cookieParser());
    consumer.apply(cookieParser()).forRoutes("*");
  }

}
