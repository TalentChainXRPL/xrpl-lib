import { Module } from '@nestjs/common';
import { XrplService } from './xrpl/xrpl.service';
import { BalanceModule } from './balance/balance.module';
import { OrderModule } from './order/order.module';
import { MarketModule } from './market/market.module';
import { ChartModule } from './chart/chart.module';

@Module({
  imports: [BalanceModule, OrderModule, MarketModule, ChartModule],
  controllers: [],
  providers: [XrplService],
  exports: [],
})
export class AppModule {}
