import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { CodeParam } from 'src/app/models/CodeParam';
import Swal from 'sweetalert2';
import { StockBumpy } from 'src/app/models/StockBumpy';
import { CompanyStatus } from 'src/app/models/CompanyStatus';
import { CodeList } from 'src/app/models/CodeList';
import { MatDialog } from '@angular/material/dialog';
import { DailyStockLineComponent } from '../daily-stock-line/daily-stock-line.component';
import { CodeListEditComponent } from '../code-list-edit/code-list-edit.component';

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
  klineCnt:string='';
  selectTarget: string = 'all';

  codeList?: CodeList;
  codeListArray: CodeList[] = [];
  stockBumpyArray: StockBumpy[] = [];
  clickStockList: string[] = [];
  openPriceLineSameTime: boolean = true;
  detailInfo:boolean= false;

  constructor(private stockService: StockService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.getCodeListByUser('dev-user');
  }

  toggleClickList(code: string, beginDate:string, endDate:string) {
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

    let codeParam: CodeParam = {
      code: this.selectTarget,
      beginDate: this.beginDate,
      endDate: this.endDate,
      bumpyHighLimit: bumpyHighLimit,
      bumpyLowLimit: bumpyLowLimit,
      tradeVolumeLimit: tradeVolumeLimit * 1000,
      beforeEndDateDays: beforeEndDateDays,
      klineCnt:klineCnt
    };

    this.stockService
      .getAllRangeOfHighAndLowPoint(codeParam)
      .subscribe((res) => {
        Swal.fire({
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          title: 'calc finish',
          toast: true,
          showConfirmButton: false,
        });
        if (res) {
          this.stockBumpyArray = res;
        } else {
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
          return;
        }
        Swal.fire({
          title: 'Processing...',
          toast: true,
          showConfirmButton: false,
        });
        Swal.showLoading();
        let codeList = this.wrapperCodeList(name);
        this.saveCodeList(codeList);
      }
    });
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
      height:'60%',
      data: {
        codeListId:this.selectTarget
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCodeListByUser('dev-user')
    });
  }
}
