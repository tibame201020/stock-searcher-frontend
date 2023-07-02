export interface StockBumpy {
    code:string;
    name:string;
    beginDate:string;
    endDate:string;

    highestDate:string[];
    highestPrice:number;

    lowestDate: string[];
    lowestPrice:number;

    lowestTradeVolumeDate: string[];
    lowestTradeVolume:number;

    calcResult:number;
}
