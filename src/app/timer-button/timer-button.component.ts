import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-timer-button',
  imports: [],
  templateUrl: './timer-button.component.html',
  styleUrl: './timer-button.component.css',
})
export class TimerButtonComponent {
  @Input() time!: number;
  @Input() message!: string;

  timeLeft = signal(0);
  interval: any;
  ngOnInit(){
    this.timeLeft.update((value) => this.time);
  }

  startTimer() {
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update((value) => value - 1);
      }else{
        alert("Times up!!!!!!!!!!!!!")
        this.timeLeft.update((value)=> this.time)
        clearInterval(this.interval)
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
