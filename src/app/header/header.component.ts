import { Component, OnInit } from '@angular/core';
import { alink, Bar } from '../constant/alink';
import { HEADER } from '../constant/header';
import { SideBarService } from '../services/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  headers:alink[] = HEADER.alink;

  constructor(public sideBarService:SideBarService) { }

  ngOnInit(): void {
  }

}
