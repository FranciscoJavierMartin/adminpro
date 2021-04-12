import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [],
})
export class DoughnutComponent implements OnInit {
  @Input() data: MultiDataSet;
  @Input() labels: Label[];
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
