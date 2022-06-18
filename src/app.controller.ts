import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';
import { validateBalanceQuery } from './validators/balance.validator';
import { validateCurrencyBalanceQuery } from './validators/currency-balance.validator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('balances')
  async getBalances(@Req() req: Request) {
    if (validateBalanceQuery(req.query?.address.toString() || '')) {
      return this.appService.getBalances(req.query.address.toString());
    } else {
      throw new Error('Query param "address" is required');
    }
  }

  @Get('currency-balance')
  async getBalance(@Req() req: Request) {
    if (
      validateCurrencyBalanceQuery(
        req.query?.address.toString() || '',
        req.query?.currency.toString() || '',
      )
    ) {
      return this.appService.getCurrencyBalances(
        req.query.address.toString(),
        req.query.currency.toString(),
      );
    } else {
      throw new Error('Missing query params');
    }
  }
}
