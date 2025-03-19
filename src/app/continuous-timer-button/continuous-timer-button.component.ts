import { SourceMapV3 } from './../../../../Lektion10/node_modules/@jridgewell/gen-mapping/dist/types/types.d';
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
    this.interval = setInterval(async () => {
      if (this.timeLeft() < this.time2 ) {
        this.timeLeft.update((value) => value + 1);
      }else{
        this.playSound()
        alert("HARD BOILED")
        this.timeLeft.update((value)=> 0 )
        clearInterval(this.interval)
      }
      if (this.timeLeft() === this.time ) {
        await this.playSound()
        alert ("SOFT BOILED")
      }

      if (this.timeLeft() === this.time1 ) {
        this.playSound()
        alert ("MEDIUM BOILED")
      }

    }, 1000);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }

   playSound() {
    const audio = new Audio();
    audio.src = "chicSound.wav"
    audio.load();
    audio.play()
    
    .catch((error) => {
      console.error("Ljudet kunde inte spelas:", error);
    });
  }
}
