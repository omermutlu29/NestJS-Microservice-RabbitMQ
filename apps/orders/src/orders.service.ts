import { Inject, Injectable } from "@nestjs/common";
import { CreateOrderRequest } from "./dto/create-order-request.dto";
import { OrdersRepository } from "./repositories/orders.repository";
import { lastValueFrom } from "rxjs";
import { BILLING_SERVICE } from "./constants/services";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository,
              @Inject(BILLING_SERVICE) private billingClient: ClientProxy) {
  }

  async createOrder(request: CreateOrderRequest, authentication: string) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request, { session });
      await lastValueFrom(
        this.billingClient.emit("order_created",
          { request, Authentication: authentication }
        ));

      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return await this.ordersRepository.find({});
  }

  async getUsersOrder(user_id){
    return await this.ordersRepository.find({user_id: user_id});
  }
}
