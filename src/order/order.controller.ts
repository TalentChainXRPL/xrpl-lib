import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipe/validation.pipe';
import { balanceSchema } from 'src/schema/balance.schema';
import { currencyOrderSchema } from 'src/schema/currency-orders.schema';
import { currencyPairOrderSchema } from 'src/schema/currency-pair-order.schema';
import { Balance } from 'src/type/balance.type';
import { CurrencyOrder } from 'src/type/currency-order.type';
import { CurrencyPairOrder } from 'src/type/currency-pair-order.type';

import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(balanceSchema))
  async getOrders(@Query() query: Balance) {
    return this.orderService.getAllOrders(query.address);
  }

  @Get('currency')
  @UsePipes(new JoiValidationPipe(currencyOrderSchema))
  async getCurrencyOrders(@Query() query: CurrencyOrder) {
    return this.orderService.getCurrencyOrders(
      query.address,
      query.currency,
      query.issuer,
    );
  }

  @Get('currency-pair')
  @UsePipes(new JoiValidationPipe(currencyPairOrderSchema))
  async getCurrencyPairOrders(@Query() query: CurrencyPairOrder) {
    return this.orderService.getCurrencyPairOrders(
      query.address,
      query.base,
      query.counter,
    );
  }
}
