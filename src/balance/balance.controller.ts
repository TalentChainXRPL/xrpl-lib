import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { BalanceService } from './balance.service';
import { validateBalanceQuery } from 'src/validators/balance.validator';
import { validateCurrencyBalanceQuery } from 'src/validators/currency-balance.validator';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async getBalances(@Req() req: Request) {
    if (validateBalanceQuery(req.query?.address.toString() || '')) {
      return this.balanceService.getBalances(req.query.address.toString());
    } else {
      throw new Error('Query param "address" is required');
    }
  }

  @Get('currency')
  async getBalance(@Req() req: Request) {
    if (
      validateCurrencyBalanceQuery(
        req.query?.address.toString() || '',
        req.query?.currency.toString() || '',
      )
    ) {
      return this.balanceService.getCurrencyBalances(
        req.query.address.toString(),
        req.query.currency.toString(),
        req.query?.issuer?.toString() || undefined,
      );
    } else {
      throw new Error('Missing query params');
    }
  }
}
