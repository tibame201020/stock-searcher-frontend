import { CompanyStatus } from './../../models/CompanyStatus';
import { CodeList } from 'src/app/models/CodeList';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-list-result',
  templateUrl: './code-list-result.component.html',
  styleUrls: ['./code-list-result.component.css']
})
export class CodeListResultComponent implements OnInit {

  codeListArray: CodeList[] = [];
  compareList: string[] = [];

  companyStatusArray: CompanyStatus[] = [];

  constructor(public dialogRef: MatDialogRef<CodeListResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stockService: StockService,) { }

  ngOnInit(): void {
    this.getCodeListByUser(this.data.user);
  }

  getCodeListByUser(user: string) {
    this.stockService.getCodeListByUser(user).subscribe((res) => {
      this.codeListArray = res;
    });
  }

  getIntersectionFromCodeList() {
    if (this.compareList.length < 2) {
      Swal.fire({
        icon: 'error',
        timer: 1500,
        timerProgressBar: true,
        title: '選擇比對的codeList最少兩組',
        toast: true,
        showConfirmButton: false,
      }).then((result) => {
        this.getCodeListByUser('dev-user');
      });
      return;
    }
    this.stockService.getIntersectionFromCodeList(this.compareList)
      .subscribe(
        res => {
          if (res) {
            this.companyStatusArray = res;
          } else {
            this.companyStatusArray = [];
          }
          if (!this.companyStatusArray.length) {
            Swal.fire({
              icon: 'info',
              timer: 1800,
              timerProgressBar: true,
              title: '選擇的codeList並無重複的股票',
              toast: true,
              showConfirmButton: false,
            }).then((result) => {
              this.getCodeListByUser('dev-user');
            });
          }
        }
      )
  }

  isInCompareList(codeListId:string) {
    return this.compareList.includes(codeListId);
  }

  toggleCompareList(codeListId:string) {
    if (this.compareList.includes(codeListId)) {
      this.compareList.splice(this.compareList.indexOf(codeListId), 1);
    } else {
      this.compareList.push(codeListId);
    }
  }

  saveCompareList() {
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

    let codeList: CodeList = {
      codeListId: user + '-' + name + '-' + date,
      name: name,
      user: user,
      date: date,
      codes: this.companyStatusArray,
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


}
