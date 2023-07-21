import { Component, OnInit } from '@angular/core';
import { alink, Bar } from '../constant/alink';
import { HEADER } from '../constant/header';
import { SideBarService } from '../services/side-bar.service';
import { environment } from 'src/environments/environment';
declare var Noty: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headers:alink[] = HEADER.alink;
  private notyList: any[] = [];
  private maxNotyCount = 10;

  constructor(public sideBarService:SideBarService) { }

  ngOnInit(): void {
    const eventSource = new EventSource(environment.sseUrl);
    eventSource.onmessage = (event) => {
      this.wrapperLog(event.data);
    };
  }

  wrapperLog(str: any) {
    let type = 'info';
    if (str.includes('===============================================')) {
      type = 'success';
    }

    const noty = new Noty({
      text: str,
      type: type,
      theme: 'mint',
      timeout: 3000,
      onClose: () => {
        const index = this.notyList.indexOf(noty);
        if (index !== -1) {
          this.notyList.splice(index, 1);
        }
      }
    });

    noty.show();
    this.notyList.push(noty);

    if (this.notyList.length > this.maxNotyCount) {
      const frontNoty = this.notyList.shift();
      frontNoty.close();
    }

  }

}
