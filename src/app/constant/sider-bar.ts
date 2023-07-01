import { Bar } from './alink';

export const SEARCH_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'price',
      link: '/search/price',
      icon: 'attach_money',
    },
  ],
};

export const STRATEGY_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'STRATEGY',
      link: '/strategy/backtesting',
      icon: 'query_stats',
    },
    {
      name: 'CODE_LIST',
      link: '/strategy/codelist',
      icon: 'dataset',
    },
  ],
};
