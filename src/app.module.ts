import { Module } from '@nestjs/common';
import { XrplService } from './xrpl/xrpl.service';
import { BalanceModule } from './balance/balance.module';
import { OrderModule } from './order/order.module';
import { MarketModule } from './market/market.module';

@Module({
  imports: [BalanceModule, OrderModule, MarketModule],
  controllers: [],
  providers: [XrplService],
})
export class AppModule {}
