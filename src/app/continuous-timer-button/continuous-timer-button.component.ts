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
 @Input() timeer!: number;
  

  timeLeft = signal(0);
  interval: any;
  ngOnInit(){
    this.timeLeft.update((value) => 0 );
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft() < this.time ) {
        this.timeLeft.update((value) => value + 1);
      }else{
        alert("HARD BOILIED")
        this.timeLeft.update((value)=> 0 )
        clearInterval(this.interval)
      }
      if (this.timeLeft() === this.time1 ) {

        alert ("SOFT BOILIED")
      }

      if (this.timeLeft() === this.timeer ) {

        alert ("MEDIUM BOILIED")
      }

    }, 1000);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}
