import { Injectable } from '@nestjs/common';
import * as xrpl from 'xrpl';

@Injectable()
export class AppService {
  async getBalances(address: string) {
    try {
      const sdk = new xrpl.Client('wss://xrplcluster.com');
      await sdk.connect();
      return await sdk.getBalances(address);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCurrencyBalances(address: string, currency: string) {
    try {
      const sdk = new xrpl.Client('wss://xrplcluster.com');
      await sdk.connect();
      const balances = [];
      const response = await sdk.getBalances(address);
      response.forEach((balance) => {
        if (balance?.currency === currency) {
          balances.push(balance);
        }
      });
      return { balance: balances };
    } catch (err) {
      throw new Error(err);
    }
  }
}

/*
try {
    } catch (err) {
      throw new Error(err);
    }

*/
