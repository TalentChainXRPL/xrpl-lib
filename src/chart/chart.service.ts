import { HttpException, Injectable } from '@nestjs/common';
import { default as axios } from 'axios';

@Injectable()
export class ChartService {
  async getChartData(
    period: string,
    from: string,
    base: string,
    counter: string,
  ) {
    if (base === counter) {
      throw new HttpException('Base and Counter cannot be same', 400);
    }

    let isCounterXrp = false;
    let isBaseXrp = false;
    let baseCurrency = '';
    let baseIssuer = '';
    let counterCurrency = '';
    let counterIssuer = '';

    if (base.toLowerCase() === 'xrp') {
      isBaseXrp = true;
    } else {
      const baseInfo = base.split('+');
      baseIssuer = baseInfo[0];
      baseCurrency = baseInfo[1];
    }

    if (counter.toLowerCase() === 'xrp') {
      isCounterXrp = true;
    } else {
      const counterInfo = counter.split('+');
      counterIssuer = counterInfo[0];
      counterCurrency = counterInfo[1];
    }

    if (isBaseXrp && isCounterXrp) {
      throw new HttpException('Invalid currencies!', 400);
    }

    const toRippleTime = Math.floor((new Date().getTime() - 3) / 1000);
    const fromRippleTime = new Date(from).toString();

    let symbol = '';

    if (isBaseXrp && !isCounterXrp) {
      symbol = `XRP%2F${counterCurrency}%2B${counterIssuer}`;
    } else if (!isBaseXrp && isCounterXrp) {
      symbol = `${baseCurrency}%2B${baseIssuer}%2FXRP`;
    } else if (!isBaseXrp && !isCounterXrp) {
      symbol = `${baseCurrency}%2B${baseIssuer}%2F${counterCurrency}%2B${counterIssuer}`;
    } else {
      throw new HttpException('Invalid currencies!', 400);
    }

    const data = await this.getOhlcResponse(
      fromRippleTime,
      toRippleTime,
      period,
      symbol,
    );

    const newData = [];
    let totalVolume = 0;

    data.forEach((val) => {
      const obj = {
        date: '', // Date
        open: 0,
        volume: 0,
        high: 0,
        low: 0,
        close: 0,
      };
      // const dateStringArray = new Date(val[0] * 1000).toString().split(' ');
      // obj.date = `${dateStringArray[0]} ${dateStringArray[1]} ${dateStringArray[2]}`; // timestamp
      obj.date = new Date(val[0] * 1000).toISOString();
      obj.open = parseFloat(val[1]); // open
      obj.high = parseFloat(val[2]); // high
      obj.low = parseFloat(val[3]); // low
      obj.close = parseFloat(val[4]); // close
      obj.volume = parseFloat(val[5]); // volume
      totalVolume += parseFloat(val[5]);
      newData.push(obj);
    });
    // (newData as any).__dataIntents = {
    //   close: ['SeriesTitle/Stock Prices'],
    // };
    return { chartData: newData, totalVolume: totalVolume };
  }

  async getOhlcResponse(fromRippleTime, toRippleTime, period, symbol) {
    const chunkByDays = 60;

    if (period.slice(-1) === 'w') {
      const response = await axios.get(
        `https://api.sologenic.org/api/v1/ohlc?symbol=${symbol}&period=${period}&from=${Math.floor(
          (new Date(fromRippleTime).getTime() - 3) / 1000,
        )}&to=${toRippleTime}`,
      );

      return response.data;
    } else {
      let data = [];
      const dateBlocks = this.getDateBlocks(
        new Date(fromRippleTime),
        new Date(),
        chunkByDays,
      );

      for (const [i, block] of dateBlocks.entries()) {
        let endDate = Math.floor((new Date(block.end).getTime() - 3) / 1000);
        if (i === dateBlocks.length - 1) {
          endDate = Math.floor((new Date().getTime() - 3) / 1000);
        }
        const response = await axios.get(
          `https://api.sologenic.org/api/v1/ohlc?symbol=${symbol}&period=${period}&from=${Math.floor(
            (new Date(block.start).getTime() - 3) / 1000,
          )}&to=${endDate}`,
        );

        data = [...data, ...response.data];
      }
      return data;
    }
  }

  getDateBlocks(start, end, maxDays) {
    const result = [];
    // Copy start so don't affect original
    const s = new Date(start);

    while (s < end) {
      // Create a new date for the block end that is s + maxDays
      const e = new Date(s.getFullYear(), s.getMonth(), s.getDate() + maxDays);
      // Push into an array. If block end is beyond end date, use a copy of end date
      result.push({ start: new Date(s), end: e <= end ? e : new Date(end) });
      // Increment s to the start of the next block which is one day after
      // the current block end
      s.setDate(s.getDate() + maxDays + 1);
    }
    return result;
  }
}
