import { Module } from '@nestjs/common';
import { XrplService } from './xrpl/xrpl.service';
import { BalanceModule } from './balance/balance.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [BalanceModule, OrderModule],
  controllers: [],
  providers: [XrplService],
})
export class AppModule {}
