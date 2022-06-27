import { Injectable } from '@nestjs/common';
import { XrplService } from 'src/xrpl/xrpl.service';

@Injectable()
export class BalanceService {
  constructor(private readonly xrplService: XrplService) {}

  async getBalances(address: string) {
    try {
      const sdk = await this.xrplService.getSDK();
      return await sdk.getBalances(address);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getCurrencyBalances(address: string, currency: string, issuer: string) {
    try {
      const sdk = await this.xrplService.getSDK();
      const balances = [];
      const response = await sdk.getBalances(address);

      if (!issuer) {
        if (currency.toLowerCase() !== 'xrp') {
          throw new Error(
            "If you're trying to get balance for a currency other than XRPL, you must specify the issuer address otherwise specify xrp as currency",
          );
        }

        balances.push(response[0]);
      } else {
        response.forEach((balance) => {
          if (balance?.currency === currency) {
            balances.push(balance);
          }
        });
      }

      return { balance: balances[0] };
    } catch (err) {
      throw new Error(err);
    }
  }
}
