import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-continuous-timer-button',
  imports: [],
  templateUrl: './continuous-timer-button.component.html',
  styleUrl: './continuous-timer-button.component.css'
})
export class ContinuousTimerButtonComponent {
 @Input() time!: number;
 @Input() time1!: number;
 @Input() time2!: number;
  

  timeLeft = signal(0);
  interval: any;
  ngOnInit(){
    this.timeLeft.update((value) => 0 );
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft() < this.time2 ) {
        this.timeLeft.update((value) => value + 1);
      }
      if (this.timeLeft() === this.time2){
        alert("HARD BOILED")
        clearInterval(this.interval) 
      }
      else if (this.timeLeft() === this.time1 ) {
        alert ("MEDIUM BOILED")
      }
      else if (this.timeLeft() === this.time ) {
        alert ("SOFT BOILIED")
      }
    }, 1000);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
