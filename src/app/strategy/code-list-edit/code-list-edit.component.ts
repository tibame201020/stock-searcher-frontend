import { CodeList } from 'src/app/models/CodeList';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StockService } from 'src/app/services/stock.service';
import { CompanyStatus } from 'src/app/models/CompanyStatus';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code-list-edit',
  templateUrl: './code-list-edit.component.html',
  styleUrls: ['./code-list-edit.component.css']
})
export class CodeListEditComponent implements OnInit {

  codeList: CodeList = {
    codeListId: '',
    name: '',
    user: '',
    date: new Date(),
    codes: []
  };
  stockCodeList: CompanyStatus[] = [];

  formGroup: FormGroup = this.formBuilder.group({
    keyword: [''],
  });

  constructor(public dialogRef: MatDialogRef<CodeListEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public stockService: StockService,
    private formBuilder: FormBuilder,) { }


  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((value) => {
      if (value.keyword) {
        this.getStockCodeList(value.keyword);
      }
    });



    if (this.data.codeListId) {
      this.getCodeList(this.data.codeListId);
    } else {
      this.codeList = {
        codeListId: '',
        name: '',
        user: 'dev-user',
        date: new Date(),
        codes: [],
      };
    }
  }


  getStockCodeList(key: string) {
    if (key.length < 2) {
      return;
    }
    this.stockService.getCodeNmList(key).subscribe((res) => {
      this.stockCodeList = res;
    });
  }


  getCodeList(codeListId: string) {
    this.stockService.getCodeList(codeListId).subscribe(res => {
      this.codeList = res;
    })
  }

  addToCodes() {
    let code = this.formGroup.value.keyword;
    let name ='';

    if (!code) {
      return;
    }

    if (code.includes(':')) {
      name = code.split(":")[1];
      code = code.split(":")[0];
    }

    let codeObj:CompanyStatus = {
      Code:code,
      Name:name
    }

    if (this.codeList.codes.some(obj => obj.Code === codeObj.Code)) {
      Swal.fire({
        icon: 'error',
        title: '股票已在目前列表中',
        position:'center',
        showConfirmButton:false,
        timer:700,
        toast: true
      })
      return;
    }

    this.codeList.codes.push(codeObj);
    this.formGroup.patchValue({
      keyword:''
    });
  }

  removeToCodes(idx:number, code:string) {
    Swal.fire({
      toast:true,
      title: '移除此股票: ' + code + '?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText:'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.codeList.codes.splice(idx, 1);
      }
    })
  }

  saveCodeList() {
    if (!this.codeList.name) {
      Swal.fire({
        icon: 'error',
        title: 'code list的名稱是必要的',
        position:'center',
        showConfirmButton:false,
        timer:700,
        toast: true
      })
      return;
    }

    if (!this.codeList.codes.length) {
      Swal.fire({
        icon: 'error',
        title: '無任何股票在股票列表中',
        position:'center',
        showConfirmButton:false,
        timer:700,
        toast: true
      })
      return;
    }

    Swal.fire({
      toast:true,
      title: '要儲存此codeList嗎?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText:'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        if (!this.data.codeListId) {
          let date = new Date();
          this.codeList.codeListId = this.codeList.user + '-' + this.codeList.name + '-' + date;
          this.codeList.date = date;
        }

        Swal.fire({
          title: 'Processing...',
          toast: true,
          showConfirmButton: false,
        });
        Swal.showLoading();

        this.stockService.saveCodeList(this.codeList).subscribe(
          res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'save finish',
                position:'center',
                showConfirmButton:false,
                timer:900,
                toast: true
              }).then(result => {
                this.dialogRef.close();
              })
            } else {
              Swal.fire({
                icon: 'error',
                title: 'save error',
                position:'center',
                showConfirmButton:false,
                timer:700,
                toast: true
              })
            }
          }
        )
      }
    })

  }


}
