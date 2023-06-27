export interface EchartLineData {
    xAxisData: string[];
    echartLineNames:EchartLineName[];
    echartLineSeries:EchartLineSerie[];
}

export interface EchartLineName {
    name:string;
}

export interface EchartLineSerie {
    name: string;
    type: string;
    data: any;
}