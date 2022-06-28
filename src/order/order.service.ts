import { Injectable } from '@nestjs/common';
import * as xrpl from 'xrpl';

import { XrplService } from 'src/xrpl/xrpl.service';

@Injectable()
export class OrderService {
  constructor(private readonly xrplService: XrplService) {}

  async getAllOrders(address: string) {
    try {
      const sdk = await this.xrplService.getSDK();

      const tx = {
        command: 'account_offers',
        account: address,
      };

      const orders: xrpl.AccountOffersResponse = await sdk.request(tx);

      return { orders: orders.result.offers };
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrencyOrders(address: string, currency: string, issuer: string) {
    try {
      const sdk = await this.xrplService.getSDK();

      const tx = {
        command: 'account_offers',
        account: address,
      };

      const ordersResponse: xrpl.AccountOffersResponse = await sdk.request(tx);
      const orders = [];
      ordersResponse.result.offers.forEach((offer: xrpl.AccountOffer) => {
        if (typeof offer.taker_gets === 'object') {
          if (
            offer.taker_gets.currency === currency &&
            offer.taker_gets.issuer === issuer
          ) {
            orders.push(offer);
          }
        } else if (typeof offer.taker_pays === 'object') {
          if (
            offer.taker_pays.currency === currency &&
            offer.taker_pays.issuer === issuer
          ) {
            orders.push(offer);
          }
        }
      });
      return { orders: orders };
    } catch (error) {
      console.log(error);
    }
  }

  async getCurrencyPairOrders(address: string, base: string, counter: string) {
    try {
      if (base === counter) {
        throw new Error('Base and Counter cannot be same');
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

      const sdk = await this.xrplService.getSDK();

      const tx = {
        command: 'account_offers',
        account: address,
      };

      const ordersResponse: xrpl.AccountOffersResponse = await sdk.request(tx);
      const orders = [];
      if (!isBaseXrp && !isCounterXrp) {
        ordersResponse.result.offers.forEach((offer: xrpl.AccountOffer) => {
          if (typeof offer.taker_gets === 'object') {
            if (
              offer.taker_gets.currency === baseCurrency &&
              offer.taker_gets.issuer === baseIssuer
            ) {
              orders.push(offer);
            }
          } else if (typeof offer.taker_pays === 'object') {
            if (
              offer.taker_pays.currency === counterCurrency &&
              offer.taker_pays.issuer === counterIssuer
            ) {
              orders.push(offer);
            }
          }
        });
        return { orders: orders };
      } else {
        if (!isBaseXrp && isCounterXrp) {
          ordersResponse.result.offers.forEach((offer: xrpl.AccountOffer) => {
            if (
              typeof offer.taker_gets === 'object' &&
              typeof offer.taker_pays !== 'object'
            ) {
              if (
                offer.taker_gets.currency === baseCurrency &&
                offer.taker_gets.issuer === baseIssuer
              ) {
                orders.push(offer);
              }
            }
          });
          return { orders: orders };
        } else if (isBaseXrp && !isCounterXrp) {
          ordersResponse.result.offers.forEach((offer: xrpl.AccountOffer) => {
            if (
              typeof offer.taker_pays === 'object' &&
              typeof offer.taker_gets !== 'object'
            ) {
              if (
                offer.taker_pays.currency === counterCurrency &&
                offer.taker_pays.issuer === counterIssuer
              ) {
                orders.push(offer);
              }
            }
          });
          return { orders: orders };
        } else {
          throw new Error('Invalid currencies!');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
