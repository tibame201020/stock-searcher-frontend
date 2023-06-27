import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share/share.module';
import { PriceComponent } from './price/price.component';
import { ShareshareComponetsModule } from '../share/shareshare-componets/shareshare-componets.module';


@NgModule({
  declarations: [PriceComponent],
  imports: [ShareshareComponetsModule],
})
export class SearchModule {}
