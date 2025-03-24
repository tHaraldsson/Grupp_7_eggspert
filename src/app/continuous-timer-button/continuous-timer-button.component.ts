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

// todo: async await for angular
  startTimer() {
    clearInterval(this.interval) 
    this.interval = setInterval(async () => {
      if (this.timeLeft() < this.time2 ) {
        this.timeLeft.update((value) => value + 1);
      }
      if (this.timeLeft() === this.time2){
        this.playSound();
        //alert("HARD BOILED")
        clearInterval(this.interval) 
      }
      else if (this.timeLeft() === this.time1 ) {
        this.playSound();
        //alert ("MEDIUM BOILED")
      }
      else if (this.timeLeft() === this.time ) {
        this.playSound();
        //alert ("SOFT BOILIED")
      }
    }, 1000);

  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer(){
    this.timeLeft.update((value) => 0 )
    clearInterval(this.interval)
  }

  playSound() {
    const audio = new Audio('/audio/chicSound.mp3'); 
    audio.play();
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60); // Hitta antalet minuter
    const remainingSeconds = seconds % 60; // Hitta de återstående sekunderna
  
    // Formatera minuter och sekunder så att de alltid är två siffror
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
