import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeParam } from 'src/app/models/CodeParam';
import { StockData } from 'src/app/models/StockData';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-daily-stock-line',
  templateUrl: './daily-stock-line.component.html',
  styleUrls: ['./daily-stock-line.component.css']
})
export class DailyStockLineComponent implements OnInit {
  stockDatas:StockData[] = [];

  constructor(public dialogRef: MatDialogRef<DailyStockLineComponent>,
    @Inject(MAT_DIALOG_DATA) public codeParam: CodeParam,
    public stockService:StockService) { }

  ngOnInit(): void {
    Swal.fire({
      title: "Processing...",
      toast: true,
      showConfirmButton: false
    })
    Swal.showLoading()
    this.stockDatas = [];

    this.stockService.getStockData(this.codeParam).subscribe(
      res => {
        Swal.close();
        this.stockDatas = res;
      }
    )
  }
}
