import { DexParams } from './types';
import { DexConfigMap, AdapterMappings } from '../../types';
import { Network, SwapSide } from '../../constants';

export const AirswapConfig: DexConfigMap<DexParams> = {
  Airswap: {
    // TODO: complete me!
    [Network.MAINNET]: {
      poolAddress: '0xe2E7AE67E7ee6d4D90dfef945aB6dE6A14dB4c17',
      subgraphURL: 'https://api.thegraph.com/subgraphs/name/airswap/airswap',
    },
    [Network.POLYGON]: {
      poolAddress: '0xF5709FF738C8193F876D2b070f25b1aC433Cb5e0',
      subgraphURL: '',
    },
    [Network.BSC]: {
      poolAddress: '0x16B57a5958271C479f64BC5F830DfC4f30ba2235',
      subgraphURL: '',
    },
    [Network.AVALANCHE]: {
      poolAddress: '0xd3B6279cD6b21e92A6c53476E59a2C819018D6fE',
      subgraphURL: '',
    },
  },
};

export const Adapters: Record<number, AdapterMappings> = {
  // TODO: add adapters for each chain
  // This is an example to copy
  [Network.MAINNET]: { [SwapSide.SELL]: [{ name: '', index: 0 }] },
};
