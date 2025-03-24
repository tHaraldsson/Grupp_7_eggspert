import { Component, Input, OnInit, signal } from '@angular/core';
import { timestamp } from 'rxjs';
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
        this.playSound();
        //alert("Times up!!!!!!!!!!!!!")
        this.timeLeft.update((value)=> this.time)
        clearInterval(this.interval)
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  resetTimer(){
    this.timeLeft.update((value) => this.time)
    clearInterval(this.interval)
  }

  playSound() {
    const audio = new Audio('/audio/chicSound.mp3'); 
    audio.play();
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

}


