import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);

  handleOrderCreated(data: any) {
    this.logger.log("billing...", data);
  }
}
