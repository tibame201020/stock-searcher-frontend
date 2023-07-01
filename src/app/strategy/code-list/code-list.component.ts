import { CodeListResultComponent } from './../code-list-result/code-list-result.component';
import { CodeList } from 'src/app/models/CodeList';
import { CodeListEditComponent } from './../code-list-edit/code-list-edit.component';
import { StockService } from 'src/app/services/stock.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-list',
  templateUrl: './code-list.component.html',
  styleUrls: ['./code-list.component.css']
})
export class CodeListComponent implements OnInit {

  keyword:string='';
  user:string = 'dev-user';
  codeListArray:CodeList[] = [];

  constructor(private stockService:StockService, public dialog: MatDialog){

  }

  ngOnInit(): void {
    this.getCodeListByUser(this.user)
  }

  openCodeListResult(){
    let dialogRef = this.dialog.open(CodeListResultComponent, {
      width: '90%',
      height:'60%',
      data: {
        user:this.user
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCodeListByUser(this.user)
    });
  }

  createCodeList(codeListId?:string) {
    let dialogRef = this.dialog.open(CodeListEditComponent, {
      width: '80%',
      height:'60%',
      data: {
        codeListId:codeListId
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCodeListByUser(this.user)
    });
  }

  getCodeListByUser(user: string) {
    this.stockService.getCodeListByUser(user).subscribe((res) => {
      this.codeListArray = res;
    });
  }

  editOrDelCodeList(codeList:CodeList, idx:number) {
    console.log(codeList)
    Swal.fire({
      toast:true,
      title: 'CodeList: ' + codeList.name + '?',
      showCancelButton: true,
      cancelButtonText:'取消',
      confirmButtonText: '編輯',
      showDenyButton:true,
      denyButtonText:'刪除',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createCodeList(codeList.codeListId)
      }
      if (result.isDenied) {
        this.removeCodeList(codeList, idx);
      }
    })
  }

  removeCodeList(codeList:CodeList, idx:number) {
    Swal.fire({
      toast:true,
      title: `確定移除codeList: `+ codeList.name + `?`,
      showCancelButton: true,
      cancelButtonText:'Cancel',
      confirmButtonText: 'Confirm',
    }).then((result) => {
      if (result.isConfirmed) {
        this.stockService.deleteCodeList(codeList.codeListId).subscribe(
          res => {
            Swal.fire({
              icon: 'success',
              title: 'delete successful',
              position:'center',
              showConfirmButton:false,
              timer:500,
              toast: true
            }).then(result => {
              this.codeListArray.splice(idx, 1)
            })
          }
        )
      }
    })
  }

}
