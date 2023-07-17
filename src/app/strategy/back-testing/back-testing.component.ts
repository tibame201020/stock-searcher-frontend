import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { CodeParam } from 'src/app/models/CodeParam';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { StockBumpy } from 'src/app/models/StockBumpy';
import { CompanyStatus } from 'src/app/models/CompanyStatus';
import { CodeList } from 'src/app/models/CodeList';
import { MatDialog } from '@angular/material/dialog';
import { DailyStockLineComponent } from '../daily-stock-line/daily-stock-line.component';
import { CodeListEditComponent } from '../code-list-edit/code-list-edit.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-back-testing',
  templateUrl: './back-testing.component.html',
  styleUrls: ['./back-testing.component.css'],
})
export class BackTestingComponent implements OnInit {
  beginDate: any;
  endDate: any;
  bumpyHighLimit: string = '';
  bumpyLowLimit: string = '';
  tradeVolumeLimit: string = '';
  beforeEndDateDays: string = '';
  klineCnt: string = '';
  selectTarget: string = 'all';

  lastOpenCalcLimit: string = '';
  lastCloseCalcLimit: string = '';
  closingPriceCompareTarget: string = 'none';

  codeList?: CodeList;
  codeListArray: CodeList[] = [];
  stockBumpyArray: StockBumpy[] = [];
  clickStockList: string[] = [];
  candlestickTypeList: any[] = [];
  selectedCandlestickTypeList: any[] = [];
  openPriceLineSameTime: boolean = false;
  detailInfo: boolean = false;
  minSearchBar: boolean = false;
  priceLowLimit: string = '';
  priceHighLimit: string = '';
  without4upCode: boolean = true;

  constructor(private stockService: StockService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getCodeListByUser('dev-user');
    this.getAllCandlestickType();
  }

  remove(candlestickType: any): void {
    let idx = this.selectedCandlestickTypeList.indexOf(candlestickType);
    if (idx >= 0) {
      this.selectedCandlestickTypeList.splice(idx, 1);
      this.candlestickTypeList.push(candlestickType);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    let candlestickType = event.option.value;
    if (this.selectedCandlestickTypeList.includes(candlestickType)) {
      return;
    }
    let idx = this.candlestickTypeList.indexOf(candlestickType);
    if (idx >= 0) {
      this.selectedCandlestickTypeList.push(candlestickType);
      this.candlestickTypeList.splice(idx, 1);
    }
  }

  getAllCandlestickType() {
    this.stockService
      .getAllCandlestickType()
      .subscribe((res) => (this.candlestickTypeList = res));
  }

  toggleMinSearchBar() {
    this.minSearchBar = !this.minSearchBar;
  }

  toggleClickList(code: string, beginDate: string, endDate: string) {
    if (this.clickStockList.includes(code)) {
      this.clickStockList.splice(this.clickStockList.indexOf(code), 1);
      return;
    } else {
      this.clickStockList.push(code);
    }

    if (!this.openPriceLineSameTime) {
      return;
    }

    this.dialog.open(DailyStockLineComponent, {
      width: '80%',
      data: {
        code: code,
        beginDate: beginDate,
        endDate: endDate,
        bumpyHighLimit: 0,
        bumpyLowLimit: 0,
        tradeVolumeLimit: 0,
        lastOpenCalcLimit: 0,
        lastCloseCalcLimit: 0,
        closingPriceCompareTarget: '',
        without4upCode: false,
        priceLowLimit: 0,
        priceHighLimit: 0,
      },
    });
  }

  isInClickList(code: string) {
    return this.clickStockList.includes(code);
  }

  getDataRange(dataRange: any) {
    this.beginDate = dataRange.beginDate;
    this.endDate = dataRange.endDate;
  }

  getAllRangeOfHighAndLowPoint() {
    this.clickStockList = [];
    this.stockBumpyArray = [];
    Swal.fire({
      title: 'Processing...',
      toast: true,
      showConfirmButton: false,
    });
    Swal.showLoading();

    let bumpyHighLimit = parseInt(this.bumpyHighLimit);
    if (!bumpyHighLimit) {
      bumpyHighLimit = 0;
    }
    let bumpyLowLimit = parseInt(this.bumpyLowLimit);
    if (!bumpyLowLimit) {
      bumpyLowLimit = 0;
    }
    let tradeVolumeLimit = parseInt(this.tradeVolumeLimit);
    if (!tradeVolumeLimit) {
      tradeVolumeLimit = 0;
    }

    let beforeEndDateDays = parseInt(this.beforeEndDateDays);
    if (!beforeEndDateDays) {
      beforeEndDateDays = 0;
    }
    let klineCnt = parseInt(this.klineCnt);
    if (!klineCnt) {
      klineCnt = 0;
    }

    let lastOpenCalcLimit = parseInt(this.lastOpenCalcLimit);
    if (!lastOpenCalcLimit) {
      lastOpenCalcLimit = 0;
    }

    let lastCloseCalcLimit = parseInt(this.lastCloseCalcLimit);
    if (!lastCloseCalcLimit) {
      lastCloseCalcLimit = 0;
    }
    let priceLowLimit = parseInt(this.priceLowLimit);
    if (!priceLowLimit) {
      priceLowLimit = 0;
    }
    let priceHighLimit = parseInt(this.priceHighLimit);
    if (!priceHighLimit) {
      priceHighLimit = 0;
    }

    let selectCandlestickTypeList: string[] = [];
    this.selectedCandlestickTypeList.forEach((e) =>
      selectCandlestickTypeList.push(e.name)
    );

    let codeParam: CodeParam = {
      code: this.selectTarget,
      beginDate: this.beginDate,
      endDate: this.endDate,
      bumpyHighLimit: bumpyHighLimit,
      bumpyLowLimit: bumpyLowLimit,
      tradeVolumeLimit: tradeVolumeLimit * 1000,
      beforeEndDateDays: beforeEndDateDays,
      klineCnt: klineCnt,
      lastOpenCalcLimit: lastOpenCalcLimit,
      lastCloseCalcLimit: lastCloseCalcLimit,
      closingPriceCompareTarget: this.closingPriceCompareTarget,
      candlestickTypeList: selectCandlestickTypeList,
      without4upCode: this.without4upCode,
      priceLowLimit: priceLowLimit,
      priceHighLimit: priceHighLimit,
    };

    this.stockService
      .getAllRangeOfHighAndLowPoint(codeParam)
      .subscribe((res) => {
        if (res.length) {
          Swal.fire({
            icon: 'success',
            timer: 1500,
            timerProgressBar: true,
            title: 'calc finish',
            toast: true,
            showConfirmButton: false,
          });
          this.minSearchBar = true;
          this.stockBumpyArray = res;
        } else {
          Swal.fire({
            icon: 'info',
            timer: 1500,
            timerProgressBar: true,
            title: 'no result',
            toast: true,
            showConfirmButton: false,
          });
          this.minSearchBar = false;
          this.stockBumpyArray = [];
        }
      });
  }

  saveCalcResult() {
    Swal.fire({
      title: '輸入要儲存的名稱',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        let name = result.value;
        if (!name) {
          Swal.fire({
            text: 'codelist need name',
            icon: 'error',
            toast: true,
            showConfirmButton: false,
          });
          return;
        }
        this.createCodeListAll(name);
      }
    });
  }

  saveChooseCalcResult() {
    Swal.fire({
      title: '輸入要儲存的名稱',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        let name = result.value;
        if (!name) {
          Swal.fire({
            text: 'codelist need name',
            icon: 'error',
            toast: true,
            showConfirmButton: false,
          });
          return;
        }
        this.createCodeListSelect(name);
      }
    });
  }

  createCodeListAll(name: string) {
    Swal.fire({
      title: 'Processing...',
      toast: true,
      showConfirmButton: false,
    });
    Swal.showLoading();
    let codeList = this.wrapperCodeList(name);
    this.saveCodeList(codeList);
  }

  createCodeListSelect(name: string) {
    if (!this.clickStockList.length) {
      Swal.fire({
        title: '並未從篩選結果選中任何股票',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      title: 'Processing...',
      toast: true,
      showConfirmButton: false,
    });
    Swal.showLoading();
    let codeList = this.wrapperChooseList(name);
    this.saveCodeList(codeList);
  }

  wrapperChooseList(name: string) {
    let user = 'dev-user';
    let date = new Date();
    let codes: CompanyStatus[] = [];
    this.clickStockList.forEach((code) => {
      let companyStatus: CompanyStatus = {
        Code: code,
        Name: '',
      };

      codes.push(companyStatus);
    });

    let codeList: CodeList = {
      codeListId: user + '-' + name + '-' + date,
      name: name,
      user: user,
      date: date,
      codes: codes,
    };

    return codeList;
  }

  wrapperCodeList(name: string) {
    let user = 'dev-user';
    let date = new Date();
    let codes: CompanyStatus[] = [];
    this.stockBumpyArray.forEach((e) => {
      let companyStatus: CompanyStatus = {
        Code: e.code,
        Name: '',
      };

      codes.push(companyStatus);
    });

    let codeList: CodeList = {
      codeListId: user + '-' + name + '-' + date,
      name: name,
      user: user,
      date: date,
      codes: codes,
    };

    return codeList;
  }

  saveCodeList(codeList: CodeList) {
    this.stockService.saveCodeList(codeList).subscribe((res) => {
      if (res) {
        Swal.fire({
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          title: 'save success',
          toast: true,
          showConfirmButton: false,
        }).then((result) => {
          this.getCodeListByUser('dev-user');
        });
      }
    });
  }

  getCodeListByUser(user: string) {
    this.stockService.getCodeListByUser(user).subscribe((res) => {
      this.codeListArray = res;
    });
  }

  getCodeList() {
    let dialogRef = this.dialog.open(CodeListEditComponent, {
      width: '80%',
      height: '60%',
      data: {
        codeListId: this.selectTarget,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCodeListByUser('dev-user');
    });
  }

  checkSelectTarget() {
    return (
      this.selectTarget == 'all' ||
      this.selectTarget == 'listed' ||
      this.selectTarget == 'tpex'
    );
  }
}
