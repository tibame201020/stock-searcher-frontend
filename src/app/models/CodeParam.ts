export interface CodeParam {
  /**
   * 股票代號
   */
  code: string;
  /**
   * 起始日期
   */
  beginDate: string;
  /**
   * 結束日期
   */
  endDate: string;

  bumpyHighLimit: number;
  bumpyLowLimit: number;
  tradeVolumeLimit: number;
  beforeEndDateDays: number;
  klineCnt: number;
  lastOpenCalcLimit: number;
  lastCloseCalcLimit: number;
  closingPriceCompareTargetHigher: string;
  closingPriceCompareTargetLower: string;
  candlestickTypeList: string[];
  without4upCode: boolean;
  priceLowLimit: number;
  priceHighLimit: number;
}
