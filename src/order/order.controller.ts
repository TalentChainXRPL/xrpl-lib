import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { validateBalanceQuery } from 'src/validators/balance.validator';
import { validateCurrencyOrdersQuery } from 'src/validators/currency-orders.validator';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(@Req() req: Request) {
    if (validateBalanceQuery(req.query?.address.toString() || '')) {
      return this.orderService.getAllOrders(req.query.address.toString());
    } else {
      throw new Error('Query param "address" is required');
    }
  }

  @Get('currency')
  async getCurrencyOrders(@Req() req: Request) {
    if (
      validateCurrencyOrdersQuery(
        req.query?.address.toString() || '',
        req.query?.currency.toString() || '',
        req.query?.issuer.toString() || '',
      )
    ) {
      return this.orderService.getCurrencyOrders(
        req.query.address.toString(),
        req.query.currency.toString(),
        req.query?.issuer?.toString(),
      );
    } else {
      throw new Error('Missing query params');
    }
  }

  @Get('currency-pair')
  async getCurrencyPairOrders(@Req() req: Request) {
    if (
      validateCurrencyOrdersQuery(
        req.query?.address.toString() || '',
        req.query?.base.toString() || '',
        req.query?.counter.toString() || '',
      )
    ) {
      return this.orderService.getCurrencyPairOrders(
        req.query.address.toString(),
        req.query.base.toString(),
        req.query?.counter?.toString(),
      );
    } else {
      throw new Error('Missing query params');
    }
  }
}
