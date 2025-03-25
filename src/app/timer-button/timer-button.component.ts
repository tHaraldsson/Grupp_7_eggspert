import { Component, Input, OnInit, signal } from '@angular/core';
import { timestamp } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timer-button',
  imports: [CommonModule, FormsModule],
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

  selectedCategory: string | null = null;
  eggCount: number = 1;

  sizes = ['S', 'M', 'L', 'XL'];
  consistencies = ['Löskokt', 'Mellankokt', 'Hårdkokt'];
  temperatures = ['Kylskåpskallt', 'Rumstempererat'];

  // Tillåter dynamiska nycklar i objektet
  selectedOptions: { [key: string]: string } = {}; 

  toggleSelection(category: string) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }

  selectEggOption(category: string, option: string) {
    this.selectedOptions[category] = option; // Inga fler typfel!
    this.selectedCategory = null; // Stäng alternativraden efter val
    console.log(`Vald ${category}: ${option}`);
  }
}




