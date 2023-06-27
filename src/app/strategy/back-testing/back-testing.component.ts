import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { CodeParam } from 'src/app/models/CodeParam';
import Swal from 'sweetalert2';
import { StockBumpy } from 'src/app/models/StockBumpy';
import { MatDialog } from '@angular/material/dialog';
import { DailyStockLineComponent } from '../daily-stock-line/daily-stock-line.component';

@Component({
  selector: 'app-back-testing',
  templateUrl: './back-testing.component.html',
  styleUrls: ['./back-testing.component.css']
})
export class BackTestingComponent implements OnInit {

  beginDate: any;
  endDate: any;
  bumpyHighLimit: string = "";
  bumpyLowLimit: string = "";
  tradeVolumeLimit: string = "";
  stockBumpyArray: StockBumpy[] = [];
  clickStockList: string[] = [];
  openPriceLineSameTime: boolean = true;

  constructor(private stockService: StockService, public dialog: MatDialog) { }
  ngOnInit(): void {
  }

  toggleClickList(code: string) {
    if (this.clickStockList.includes(code)) {
      this.clickStockList.splice(this.clickStockList.indexOf(code), 1);
      return;
    } else {
      this.clickStockList.push(code);
    }

    if (!this.openPriceLineSameTime) {
      return;
    }

    this.dialog.open(
      DailyStockLineComponent,
      {
        width: '80%',
        data: {
          code: code,
          beginDate: this.beginDate,
          endDate: this.endDate,
          bumpyHighLimit: 0,
          bumpyLowLimit: 0,
          tradeVolumeLimit: 0
        }
      }
    )
  }

  isInClickList(code: string) {
    return this.clickStockList.includes(code);
  }

  getDataRange(dataRange: any) {
    this.beginDate = dataRange.beginDate;
    this.endDate = dataRange.endDate;
  }

  getAllRangeOfHighAndLowPoint() {
    this.clickStockList = []
    Swal.fire({
      title: "Processing...",
      toast: true,
      showConfirmButton: false
    })
    Swal.showLoading()

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



    let codeParam: CodeParam = {
      code: '',
      beginDate: this.beginDate,
      endDate: this.endDate,
      bumpyHighLimit: bumpyHighLimit,
      bumpyLowLimit: bumpyLowLimit,
      tradeVolumeLimit: tradeVolumeLimit * 1000
    }

    this.stockService.getAllRangeOfHighAndLowPoint(codeParam).subscribe(
      (res) => {
        Swal.fire({
          icon: 'success',
          timer: 3000,
          title: 'calc finish',
          toast: true,
          showConfirmButton: false,
        })
        if (res) {
          this.stockBumpyArray = res;
        } else {
          this.stockBumpyArray = [];
        }
      }
    )

  }

}
