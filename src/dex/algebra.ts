import { Network, SwapSide } from '../constants';
import { Address } from '../types';
import { IDexTxBuilder } from './idex';
import Web3 from 'web3';
import { UniswapV3, UniswapV3Param } from './uniswap-v3';
import { pack } from '@ethersproject/solidity';

const ALGEBRA_ROUTER_ADDRESSES: { [network: number]: Address } = {
  [Network.POLYGON]: '0x1a5bC2d507465c3e343Ca4e8B5C37Dd6B580f2C2',
};

export type AlgebraData = {
  // ExactInputSingleParams
  deadline?: number;
  path: {
    tokenIn: Address;
    tokenOut: Address;
  }[];
};

export class Algebra
  extends UniswapV3
  implements IDexTxBuilder<AlgebraData, UniswapV3Param>
{
  static dexKeys = ['algebra'];

  constructor(
    augustusAddress: Address,
    protected network: number,
    provider: Web3,
  ) {
    super(
      augustusAddress,
      network,
      provider,
      ALGEBRA_ROUTER_ADDRESSES[network],
    );
  }

  // override parent as Algebra handles fees dynamically.
  protected encodePath(
    path: {
      tokenIn: Address;
      tokenOut: Address;
      fee: number;
    }[],
    side: SwapSide,
  ): string {
    if (path.length === 0) {
      return '0x';
    }

    const { _path, types } = path.reduce(
      (
        { _path, types }: { _path: string[]; types: string[] },
        curr,
        index,
      ): { _path: string[]; types: string[] } => {
        if (index === 0) {
          return {
            types: ['address', 'address'],
            _path: [curr.tokenIn, curr.tokenOut],
          };
        } else {
          return {
            types: [...types, 'address'],
            _path: [..._path, curr.tokenOut],
          };
        }
      },
      { _path: [], types: [] },
    );

    return side === SwapSide.BUY
      ? pack(types.reverse(), _path.reverse())
      : pack(types, _path);
  }
}