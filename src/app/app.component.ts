import { Component } from '@angular/core';
import { SideBarService } from './services/side-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stockSearcher_frontend';

  constructor(public sideBarService:SideBarService) {

  }
}
