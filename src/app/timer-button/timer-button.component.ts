import { Component } from '@angular/core';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-timer-button',
  imports: [],
  templateUrl: './timer-button.component.html',
  styleUrl: './timer-button.component.css',
})
export class TimerButtonComponent {
  timeLeft: number = 5;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        alert("TIMES UP!!!!!")
        this.timeLeft = 60;
        clearInterval(this.interval)
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
