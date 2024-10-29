import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CodeParam } from 'src/app/models/CodeParam';
import { StockData } from 'src/app/models/StockData';
import { CompanyStatus } from 'src/app/models/CompanyStatus';
import { StockMAResult } from 'src/app/models/StockMAResult';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css'],
})
export class PriceComponent implements OnInit {
  stockCodeList: CompanyStatus[] = [];
  beginDate: any;
  endDate: any;
  stockDatas: StockData[] = [];
  stockMAs: StockMAResult[] = [];

  getDataStatus = false;

  formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private stockService: StockService
  ) {}

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value.keyword) {
        this.getStockCodeList(value.keyword);
        this.getStockInfo();
      }
    });
  }

  getStockCodeList(key: string) {
    if (key.length < 2) {
      return;
    }
    this.stockService.getCodeNmList(key).subscribe((res) => {
      this.stockCodeList = res;
    });
  }

  getDataRange(dataRange: any) {
    this.beginDate = dataRange.beginDate;
    this.endDate = dataRange.endDate;
    this.getStockInfo();
  }

  getStockInfo() {
    if (!this.formGroup.value.keyword || !this.beginDate || !this.endDate) {
      return;
    }

    let code = this.formGroup.value.keyword.includes(':')
      ? this.formGroup.value.keyword.split(':')[0]
      : this.formGroup.value.keyword;
    let codeParam: CodeParam = {
      code: code,
      beginDate: this.beginDate,
      endDate: this.endDate,
      bumpyHighLimit: 0,
      bumpyLowLimit: 0,
      tradeVolumeLimit: 0,
      beforeEndDateDays: 0,
      klineCnt: 0,
      lastOpenCalcLimit: 0,
      lastCloseCalcLimit: 0,
      closingPriceCompareTargetHigher: '',
      closingPriceCompareTargetLower: '',
      candlestickTypeList: [],
      without4upCode: false,
      priceLowLimit: 0,
      priceHighLimit: 0,
    };

    this.getDataStatus = true;

    this.stockService.getStockData(codeParam).subscribe((res) => {
      if (res) {
        this.stockDatas = res;
      } else {
        this.stockDatas = [];
      }
    });

    this.stockService.getStockMa(codeParam).subscribe((res) => {
      this.getDataStatus = false;
      if (res) {
        this.stockMAs = res;
      } else {
        this.stockMAs = [];
      }
    });
  }
}
