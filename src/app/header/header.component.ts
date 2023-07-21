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

  constructor(public sideBarService:SideBarService) { }

  ngOnInit(): void {
    const eventSource = new EventSource(environment.sseUrl);
    eventSource.onmessage = (event) => {
      this.wrapperLog(event.data);
    };
  }

  wrapperLog(str: any) {
    console.log(str)

    new Noty({
      type: 'alert',
      text: str,
      theme: 'nest',
      timeout: 1500
    }).show();
  }

}
