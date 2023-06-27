export interface StockBumpy {
    code:string;
    highestDate:string[];
    highestPrice:number;

    lowestDate: string[];
    lowestPrice:number;

    lowestTradeVolumeDate: string[];
    lowestTradeVolume:number;

    calcResult:number;
}