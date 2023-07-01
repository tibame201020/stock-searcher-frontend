export interface CodeParam {
    /**
     * 股票代號
     */
    code: string;
    /**
     * 起始日期
     */
    beginDate:string;
    /**
     * 結束日期
     */
    endDate:string;

    bumpyHighLimit:number;
    bumpyLowLimit:number;
    tradeVolumeLimit:number;
    beforeEndDateDays:number;
    klineCnt:number;
}
