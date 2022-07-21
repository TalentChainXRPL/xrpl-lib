import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/pipe/validation.pipe';
import { chartParametersSchema } from 'src/schema/chart-param.schema';
import { ChartParameters } from 'src/type/chart-params.type';

import { ChartService } from './chart.service';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(chartParametersSchema))
  async chartData(@Query() query: ChartParameters) {
    return this.chartService.getChartData(
      query.period,
      query.from,
      query.base,
      query.counter,
    );
  }
}
