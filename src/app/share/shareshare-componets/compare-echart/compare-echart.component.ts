import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-compare-echart',
  templateUrl: './compare-echart.component.html',
  styleUrls: ['./compare-echart.component.css']
})
export class CompareEchartComponent implements OnInit {

  options: any;
  @Input() inputData: any;

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
    this.options = {
      legend: {
        data: [
          { name: '當下獲利%' },
        ],
        align: 'left',
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
            opacity: 1
          }
        }
      },
      xAxis: {
        type: 'category',
        data: this.inputData.labels,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        scale: true,
        splitArea: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'inside',
          xAxisIndex: [0, 1],
          start: 0,
          end: 100
        },
        {
          show: true,
          xAxisIndex: [0, 1],
          type: 'slider',
          y: '90%',
          start: 0,
          end: 100
        }
      ],
      series: [
        {
          name: '當下獲利%',
          type: 'line',
          data: this.inputData.series,
          animationDelay: (idx: number) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5
    };
  }
}
