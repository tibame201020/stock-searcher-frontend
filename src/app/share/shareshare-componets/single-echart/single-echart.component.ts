import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-single-echart',
  templateUrl: './single-echart.component.html',
  styleUrls: ['./single-echart.component.css']
})
export class SingleEchartComponent implements OnInit {

  options: any;
  @Input() inputData: any;
  categoryData: string[] = [];

  /**
   * 流動資產
   */
  currentAssetsList: number[] = [];
  /**
   * 非流動資產
   */
  nonCurrentAssetsList: number[] = [];
  /**
   * 總資產
   */
  totalAssetsList: number[] = [];
  /**
   * 流動負債
   */
  currentLiabilitiesList: number[] = [];
  /**
   * 非流動負債
   */
  nonCurrentLiabilitiesList: number[] = [];
  /**
   * 總負債
   */
  totalLiabilitiesList: number[] = [];
  /**
   * 權益
   */
  equityList: number[] = [];
  /**
   * 負債及權益總計
   */
  liabilitiesAndEquityList: number[] = [];
  /**
   * 每股淨額
   */
  navpsList: number[] = [];
  /**
   * 本業營收
   */
  operatingRevenueList: number[] = [];
  /**
   * 本業成本
   */
  operatingCostsList: number[] = [];
  /**
   * 毛利(本業營收 - 本業成本)
   */
  grossProfitList: number[] = [];
  /**
   * 毛利率(毛利/本業營收)
   */
  grossProfitPercentList: number[] = [];
  /**
   * 營業費用(ex人事)
   */
  operatingExpensesList: number[] = [];
  /**
   * 本業收入(本業營收 - 本業成本 - 營業費用)
   */
  operatingIncomeList: number[] = [];
  /**
   * 外業收入
   */
  nonOperatingIncomeList: number[] = [];
  /**
   * 基本每股盈餘
   */
  epsList: number[] = [];
  /**
   * 稀釋每股盈餘
   */
  dEpsList: number[] = [];
  /**
   * 營業活動之淨現金流入（流出）
   * 營業活動現金流，指的是所有跟公司本業的營運有關的現金流入 / 流出。由於是記錄了跟「本業營運」相關的現金流，營業活動現金流可以讓投資朋友檢視公司所得的品質——去判斷賺到的「錢」，是否真的有以「現金」的方式流入。營業現金流越大，代表公司資金越充裕；如果可以長年維持正數又持續增長，可以初步判斷公司的本業營運體質很健康、也具成長性。
   */
  operatingActivitiesList: number[] = [];
  /**
   * 投資活動之淨現金流入（流出）
   * 投資活動現金流，指的是公司以「投資」為目的所發生的現金流。就公司的角度而言，所謂的「投資」，可能是像各位投資朋友一樣以交易、賺價差為目的買賣金融商品（例如：股、債等），也有另外一種可能是投資「自己」，也就是買賣營運所需的固定資產（例如：機械設備、廠房、不動產等）。
   */
  investingActivitiesList: number[] = [];
  /**
   * 籌資活動之淨現金流入（流出）
   * 籌資活動現金流，指的是公司為不同目的而償還、籌措、發放資金等等活動，所造成的現金流入或流出。可以視為「本業以外」的現金流。
   */
  financingActivitiesList: number[] = [];



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
    this.generateData();
    this.options = {
      legend: {
        data: [
          { name: '流動資產' },
          { name: '非流動資產' },
          { name: '總資產' },
          { name: '流動負債' },
          { name: '非流動負債' },
          { name: '總負債' },
          { name: '權益' },
          { name: '負債及權益總計' },
          { name: '每股淨額' },
          { name: '本業營收' },
          { name: '本業成本' },
          { name: '毛利' },
          { name: '毛利率' },
          { name: '營業費用' },
          { name: '本業收入' },
          { name: '外業收入' },
          { name: '基本每股盈餘' },
          { name: '稀釋每股盈餘' },
          { name: '營業活動之淨現金流入（流出）' },
          { name: '投資活動之淨現金流入（流出）' },
          { name: '籌資活動之淨現金流入（流出）' }
        ],
        align: 'left',
        selected: {
          '流動資產': false,
          '非流動資產': false,
          '總資產': false,
          '流動負債': false,
          '非流動負債': false,
          '總負債': false,
          '權益': false,
          '負債及權益總計': false,
          '每股淨額': false,
          '本業營收': false,
          '本業成本': false,
          '毛利': false,
          '毛利率': true,
          '營業費用': false,
          '本業收入': false,
          '外業收入': false,
          '基本每股盈餘': false,
          '稀釋每股盈餘': false,
          '營業活動之淨現金流入（流出）': false,
          '投資活動之淨現金流入（流出）': false,
          '籌資活動之淨現金流入（流出）': false
        }
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
        data: this.categoryData,
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
          name: '流動資產',
          type: 'line',
          data: this.currentAssetsList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '非流動資產',
          type: 'line',
          data: this.nonCurrentAssetsList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '總資產',
          type: 'line',
          data: this.totalAssetsList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '流動負債',
          type: 'line',
          data: this.currentLiabilitiesList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '非流動負債',
          type: 'line',
          data: this.nonCurrentLiabilitiesList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '總負債',
          type: 'line',
          data: this.totalLiabilitiesList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '權益',
          type: 'line',
          data: this.equityList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '負債及權益總計',
          type: 'line',
          data: this.liabilitiesAndEquityList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '每股淨額',
          type: 'line',
          data: this.navpsList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '本業營收',
          type: 'line',
          data: this.operatingRevenueList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '本業成本',
          type: 'line',
          data: this.operatingCostsList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '毛利',
          type: 'line',
          data: this.grossProfitList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '毛利率',
          type: 'line',
          data: this.grossProfitPercentList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '營業費用',
          type: 'line',
          data: this.operatingExpensesList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '本業收入',
          type: 'line',
          data: this.operatingIncomeList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '外業收入',
          type: 'line',
          data: this.nonOperatingIncomeList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '基本每股盈餘',
          type: 'line',
          data: this.epsList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '稀釋每股盈餘',
          type: 'line',
          data: this.dEpsList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '營業活動之淨現金流入（流出）',
          type: 'line',
          data: this.operatingActivitiesList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '投資活動之淨現金流入（流出）',
          type: 'line',
          data: this.investingActivitiesList,
          animationDelay: (idx: number) => idx * 10,
        },
        {
          name: '籌資活動之淨現金流入（流出）',
          type: 'line',
          data: this.financingActivitiesList,
          animationDelay: (idx: number) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5
    };
  }

  generateData() {
    this.initialDataLs();
    this.inputData.forEach((element: any) => {
      this.categoryData.push(element.financialSheetId.split(":")[1] + ":Q" + element.financialSheetId.split(":")[2]);
      this.currentAssetsList.push(element.currentAssets);
      this.nonCurrentAssetsList.push(element.nonCurrentAssets);
      this.totalAssetsList.push(element.totalAssets);
      this.currentLiabilitiesList.push(element.currentLiabilities);
      this.nonCurrentLiabilitiesList.push(element.nonCurrentLiabilities);
      this.totalLiabilitiesList.push(element.totalLiabilities);
      this.equityList.push(element.equity);
      this.liabilitiesAndEquityList.push(element.liabilitiesAndEquity);
      this.navpsList.push(element.navps);
      this.operatingRevenueList.push(element.operatingRevenue);
      this.operatingCostsList.push(element.operatingCosts);
      this.grossProfitList.push(element.grossProfit);
      this.grossProfitPercentList.push(element.grossProfitPercent);
      this.operatingExpensesList.push(element.operatingExpenses);
      this.operatingIncomeList.push(element.operatingIncome);
      this.nonOperatingIncomeList.push(element.nonOperatingIncome);
      this.epsList.push(element.eps);
      this.dEpsList.push(element.deps);
      this.operatingActivitiesList.push(element.operatingActivities);
      this.investingActivitiesList.push(element.investingActivities);
      this.financingActivitiesList.push(element.financingActivities);
    });


  }

  initialDataLs() {
    this.categoryData = [];
    this.currentAssetsList = [];
    this.nonCurrentAssetsList = [];
    this.totalAssetsList = [];
    this.currentLiabilitiesList = [];
    this.nonCurrentLiabilitiesList = [];
    this.totalLiabilitiesList = [];
    this.equityList = [];
    this.liabilitiesAndEquityList = [];
    this.navpsList = [];
    this.operatingRevenueList = [];
    this.operatingCostsList = [];
    this.grossProfitList = [];
    this.grossProfitPercentList = [];
    this.operatingExpensesList = [];
    this.operatingIncomeList = [];
    this.nonOperatingIncomeList = [];
    this.epsList = [];
    this.dEpsList = [];
    this.operatingActivitiesList = [];
    this.investingActivitiesList = [];
    this.financingActivitiesList = [];
  }
}
