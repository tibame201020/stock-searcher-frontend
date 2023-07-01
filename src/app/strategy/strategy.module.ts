import { CodeListComponent } from './code-list/code-list.component';
import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share/share.module';
import { BackTestingComponent } from './back-testing/back-testing.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';
import { DailyStockLineComponent } from './daily-stock-line/daily-stock-line.component';
import { CodeListEditComponent } from './code-list-edit/code-list-edit.component';
import { CodeListResultComponent } from './code-list-result/code-list-result.component';

@NgModule({
  declarations: [BackTestingComponent, DailyStockLineComponent, CodeListComponent, CodeListEditComponent, CodeListResultComponent],
  imports: [ShareshareComponetsModule],
})
export class StrategyModule {}
