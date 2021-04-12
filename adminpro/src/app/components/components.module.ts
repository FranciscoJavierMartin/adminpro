import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { DoughnutComponent } from './doughnut/doughnut.component';

@NgModule({
  declarations: [DoughnutComponent],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [DoughnutComponent],
})
export class ComponentsModule {}
