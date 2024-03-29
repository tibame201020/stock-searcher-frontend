import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { StockMAResult } from 'src/app/models/StockMAResult';

@Component({
  selector: 'app-stock-price-line',
  templateUrl: './stock-price-line.component.html',
  styleUrls: ['./stock-price-line.component.css'],
})
export class StockPriceLineComponent implements OnInit {
  options: any;
  @Input() inputData: any;
  @Input() stockMAs: any[] = [];
  categoryData: string[] = [];
  values: string[][] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inputData) {
      this.generateChart();
    }
  }

  ngOnInit(): void {
    if (this.inputData) {
      this.generateChart();
    }
  }

  generateChart() {
    this.splitData();
    const xAxisData = this.categoryData;
    const openPrice = [];
    const closePrice = [];
    const highestPrice = [];
    const lowestPrice = [];
    const ma5: any[] = [];
    const ma10: any[] = [];
    const ma20: any[] = [];
    const ma60: any[] = [];
    const kLineCandlestick = this.values;

    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';

    for (let i = 0; i < this.values.length; i++) {
      openPrice.push(this.values[i][0]);
      closePrice.push(this.values[i][1]);
      lowestPrice.push(this.values[i][2]);
      highestPrice.push(this.values[i][3]);
    }

    for (let i = 0; i < xAxisData.length; i++) {
      let dateStr = xAxisData[i];
      this.stockMAs.some((obj) => {
        let stockMaDate = obj.date[0] + '-' + obj.date[1] + '-' + obj.date[2];
        if (dateStr == stockMaDate) {
          ma5[i] = obj.ma5;
          ma10[i] = obj.ma10;
          ma20[i] = obj.ma20;
          ma60[i] = obj.ma60;
        }
      });
    }

    this.options = {
      legend: {
        data: [
          { name: '開盤價' },
          { name: '收盤價' },
          { name: '最高價' },
          { name: '最低價' },
          { name: '日K' },
          { name: 'MA5' },
          { name: 'MA10' },
          { name: 'MA20' },
          { name: 'MA60' },
        ],
        align: 'left',
        selected: {
          開盤價: false,
          收盤價: false,
          最高價: false,
          最低價: false,
          MA5: true,
          MA10: true,
          MA20: true,
          MA60: true,
          日K: true,
        },
      },
      tooltip: {
        confine: true,
        trigger: 'axis',
        axisPointer: {
          animation: true,
          type: 'cross',
          lineStyle: {
            color: '#376df4',
            width: 2,
            opacity: 1,
          },
        },
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 100,
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          y: '90%',
          start: 0,
          end: 100,
        },
      ],
      series: [
        {
          name: '開盤價',
          type: 'line',
          data: openPrice,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '收盤價',
          type: 'line',
          data: closePrice,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
        {
          name: '最高價',
          type: 'line',
          data: highestPrice,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
        {
          name: '最低價',
          type: 'line',
          data: lowestPrice,
          animationDelay: (idx: number) => idx * 10 + 100,
        },
        {
          name: '日K',
          type: 'candlestick',
          data: kLineCandlestick,
          itemStyle: {
            normal: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },
          },
          animationDelay: (idx: number) => idx * 10 + 100,
          markPoint: {
            label: {
              normal: {
                show: true,
                formatter: function (param: { value: number } | null) {
                  return param != null ? Math.round(param.value) : '';
                },
              },
            },
          },
        },
        {
          name: 'MA5',
          type: 'line',
          data: ma5,
          smooth: true,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
        {
          name: 'MA10',
          type: 'line',
          data: ma10,
          smooth: true,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
        {
          name: 'MA20',
          type: 'line',
          data: ma20,
          smooth: true,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
        {
          name: 'MA60',
          type: 'line',
          data: ma60,
          smooth: true,
          lineStyle: {
            normal: { opacity: 0.5 },
          },
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  splitData() {
    this.categoryData = [];
    this.values = [];

    this.inputData.forEach((element: any) => {
      this.categoryData.push(
        element.date[0] + '-' + element.date[1] + '-' + element.date[2]
      );
      let valueArray = [];
      valueArray.push(element.openingPrice);
      valueArray.push(element.closingPrice);
      valueArray.push(element.lowestPrice);
      valueArray.push(element.highestPrice);
      this.values.push(valueArray);
    });
  }

  calculateMA(dayCount: number) {
    let result = [];
    for (let i = 0; i < this.values.length; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += parseInt(this.values[i - j][1]);
      }
      result.push(sum / dayCount);
    }
    return result;
  }
}
