import { HttpException, Injectable } from '@nestjs/common';
import { XrplService } from 'src/xrpl/xrpl.service';

@Injectable()
export class BalanceService {
  constructor(private readonly xrplService: XrplService) {}

  async getBalances(address: string) {
    try {
      const sdk = await this.xrplService.getSDK();
      return await sdk.getBalances(address);
    } catch (err) {
      console.log(err);
      throw new HttpException('Server error, please try again.', 500);
    }
  }

  async getCurrencyBalances(address: string, currency: string, issuer: string) {
    const balances = [];

    if (!issuer) {
      if (currency.toLowerCase() !== 'xrp') {
        throw new HttpException(
          "If you're trying to get balance for a currency other than XRP, you must specify the issuer address otherwise specify xrp as currency",
          400,
        );
      }
    }
    try {
      const sdk = await this.xrplService.getSDK();
      const response = await sdk.getBalances(address);
      if (!issuer) {
        balances.push(response[0]);
      } else {
        response.forEach((balance) => {
          if (balance?.currency === currency && balance?.issuer === issuer) {
            return { balance: balance };
          }
        });
      }
      return { balance: balances[0] };
    } catch (err) {
      console.log(err);
      throw new HttpException('Server error, please try again.', 500);
    }
  }
}
