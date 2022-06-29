import { Controller, Get, Query, UsePipes } from '@nestjs/common';

import { BalanceService } from './balance.service';
import { JoiValidationPipe } from 'src/pipe/validation.pipe';
import { Balance } from 'src/type/balance.type';
import { balanceSchema } from 'src/schema/balance.schema';
import { currencyBalanceSchema } from 'src/schema/currency-balance.schema';
import { CurrencyBalance } from 'src/type/currency-balance.type';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(balanceSchema))
  async getBalances(@Query() query: Balance) {
    return this.balanceService.getBalances(query.address);
  }

  @Get('currency')
  @UsePipes(new JoiValidationPipe(currencyBalanceSchema))
  async getBalance(@Query() query: CurrencyBalance) {
    return this.balanceService.getCurrencyBalances(
      query.address,
      query.currency,
      query?.issuer || undefined,
    );
  }
}
