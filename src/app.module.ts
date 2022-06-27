import { Module } from '@nestjs/common';
import { XrplService } from './xrpl/xrpl.service';
import { BalanceModule } from './balance/balance.module';

@Module({
  imports: [BalanceModule],
  controllers: [],
  providers: [XrplService],
})
export class AppModule {}
