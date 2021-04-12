import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  progress: number = 50;
  constructor() {}

  ngOnInit(): void {}

  get getPercentage() {
    return `${this.progress}%`;
  }

  changeProgress(value: number): void {
    if (this.progress >= 0 || this.progress <= 100) {
      this.progress += value;
    }
  }
}
