import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SearchModule } from './search/search.module';
import { StrategyModule } from './strategy/strategy.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from './share/share/share.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent
  ],
  imports: [BrowserModule, ShareModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
