import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { XrplService } from 'src/xrpl/xrpl.service';

@Module({
  imports: [XrplService],
  controllers: [OrderController],
  providers: [OrderService, XrplService],
})
export class OrderModule {}
