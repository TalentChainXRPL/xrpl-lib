import { HttpException, Injectable } from '@nestjs/common';
import { default as axios } from 'axios';

@Injectable()
export class MarketService {
  async getMarketStats(base: string, counter: string) {
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

    try {
      const pair = `${baseCurrency}+${baseIssuer}/${counterCurrency}+${counterIssuer}`;

      const payload = {
        symbols: [pair],
      };

      const response = await axios.post(
        'https://api.sologenic.org/api/v1/tickers/24h',
        payload,
      );

      const tickers = response.data[`${pair}`];

      let changePercentage = 0;
      const latestPrice = tickers?.last_price;
      const oldPrice = tickers?.open_price;

      if (oldPrice === 0 && latestPrice > 0) {
        changePercentage = latestPrice;
      } else if (latestPrice === 0 && oldPrice > 0) {
        changePercentage = oldPrice * -1;
      } else if (latestPrice > 0 && oldPrice > 0) {
        changePercentage = ((latestPrice - oldPrice) / oldPrice) * 100;
      }

      const obj = {
        open: parseFloat(parseFloat(tickers?.open_price || 0).toFixed(6)),
        volume: parseFloat(parseFloat(tickers?.volume || 0).toFixed(2)),
        high: parseFloat(parseFloat(tickers?.high_price || 0).toFixed(6)),
        low: parseFloat(parseFloat(tickers?.low_price || 0).toFixed(6)),
        close: parseFloat(parseFloat(tickers?.last_price || 0).toFixed(6)),
        first: parseFloat(parseFloat(tickers?.first_price || 0).toFixed(6)),
        change: changePercentage,
      };

      return { market: obj };
    } catch (error) {
      throw new HttpException('Server error, please try again.', 500);
    }
  }
}
