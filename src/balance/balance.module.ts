import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';
import { XrplService } from 'src/xrpl/xrpl.service';

@Module({
  imports: [XrplService],
  controllers: [BalanceController],
  providers: [BalanceService, XrplService],
})
export class BalanceModule {}
