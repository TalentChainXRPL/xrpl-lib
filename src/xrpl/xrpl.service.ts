import { Injectable } from '@nestjs/common';
import * as xrpl from 'xrpl';

@Injectable()
export class XrplService {
  getSDK = async (): Promise<xrpl.Client> => {
    const sdk: xrpl.Client = new xrpl.Client('wss://xrplcluster.com');
    await sdk.connect();
    return sdk;
  };
}
