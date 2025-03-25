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




  eggQation(mass: number, waterTemp: number, startTempEgg: number, desiredTempEgg: number): number {
    // Grundläggande tidfaktor baserat på äggets massa
  let timeFactor = 0.1; // Tid per gram i sekunder för kokning vid rumstemperatur (kan justeras)
  
  // Korrigera för skillnaden mellan start- och önskad temperatur
  let tempDifference = desiredTempEgg - startTempEgg;
  
  // Beräkna koktid
  let time = mass * timeFactor * tempDifference;
  
  // Justera baserat på önskad kokgrad (kan vara t.ex. mjukkokt, hårdkokt, etc.)
  // Exempel: En extra multiplikation kan tillämpas beroende på önskad kokgrad
  if (desiredTempEgg > 70) {
    time *= 1.2; // För hårdkokta ägg, lägg till mer tid
  }

  return time; // Tid i sekunder
}
}
