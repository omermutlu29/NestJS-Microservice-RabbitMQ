import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderRequest } from "./dto/create-order-request.dto";
import { JwtAuthGuard } from "@app/common";
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices";
import { CurrentUser } from "../../auth/src/current-user.decorator";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateOrderRequest, @Req() req: any) {
    return await this.ordersService.createOrder(request, req.cookies?.Authtentication);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders(@CurrentUser() user) {
    console.log(user);
    return this.ordersService.getOrders();
  }

  @UseGuards(JwtAuthGuard)
  @EventPattern("user_wanted_to_get_orders")
  handleUserWantsToGetOrders(@Payload() data: any, @Ctx() context: RmqContext) {

  }

}
