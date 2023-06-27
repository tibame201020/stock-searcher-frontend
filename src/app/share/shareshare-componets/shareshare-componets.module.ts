import { NgModule } from '@angular/core';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { ShareModule } from '../share/share.module';
import { StockPriceLineComponent } from './stock-price-line/stock-price-line.component';
import { SingleEchartComponent } from './single-echart/single-echart.component';
import { CompareEchartComponent } from './compare-echart/compare-echart.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    DatePickerRangeComponent,
    StockPriceLineComponent,
    SingleEchartComponent,
    CompareEchartComponent,
    LoadingComponent,
  ],
  imports: [ShareModule],
  exports: [
    ShareModule,
    DatePickerRangeComponent,
    StockPriceLineComponent,
    SingleEchartComponent,
    CompareEchartComponent,
    LoadingComponent,
  ],
})
export class ShareshareComponetsModule {}
