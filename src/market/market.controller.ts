import { Controller, Get, Query, UsePipes } from '@nestjs/common';

import { JoiValidationPipe } from 'src/pipe/validation.pipe';
import { marketStatSchema } from 'src/schema/market-stats.schema';
import { MarketStats } from 'src/type/market-stats.type';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(marketStatSchema))
  async getCurrencyPairOrders(@Query() query: MarketStats) {
    return this.marketService.getMarketStats(query.base, query.counter);
  }
}
