import { Component, computed, Input, signal } from '@angular/core';
import { ContinuousTimerButtonComponent } from '../continuous-timer-button/continuous-timer-button.component'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-egg-timer',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './egg-timer.component.html',
  styleUrl: './egg-timer.component.css',
})
export class EggTimerComponent {
  time!: number;
  time1!: number;
  time2!: number;

  timeLeft = signal(0);
  statusMessage = signal('');
  interval: any;
  timerisRunning = false;

  targetTime = 0;
  checkpoints: { time: number; message: string }[] = [];

  selectedCategory: string | null = null;
  eggCount: number = 1;

  sizes = ['Small', 'Medium', 'Large', 'XLarge'];
  consistencies = ['Löskokt', 'Mellankokt', 'Hårdkokt'];
  temperatures = ['Kylskåpskallt', 'Rumstempererat'];

  selectedOptions: { [key: string]: string } = {};

  ngOnInit() {
    this.calculateCookTime();
  }

  onEggCountChange() {
    this.calculateCookTime();
    this.resetTimer();
  }

  getSizeImageName(size: string): string {
    const sizeImages: Record<string, string> = {
      'Small': 'smallegg.png',
      'Medium': 'mediumegg.png',
      'Large': 'largeegg.png',
      'XLarge': 'xlegg.png'
    };
    return sizeImages[size] || 'assets/images/default-egg.png';
  }

  getConcistencyImageName(size: string): string {
    const sizeImages: Record<string, string> = {
      'Löskokt': 'löskokt.png',
      'Mellankokt': 'mediumkokt.png',
      'Hårdkokt': 'hårdkokt.png'
    };
    return sizeImages[size] || 'assets/images/default-egg.png';
  }
  


  startTimer() {
    clearInterval(this.interval);
    
    this.interval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update(v => v - 1);
        this.updateHenPosition();
      }

      if (this.eggCount > 1) {
        this.checkpoints.forEach(checkpoint => {
          if (this.timeLeft() === checkpoint.time) {
            this.playSound();
            this.statusMessage.set(`Just nu:<br><strong>${checkpoint.message}</strong>`);
          }
        });
      }

      if (this.timeLeft() === 0) {
        this.playSound();
        this.timerisRunning = false;
        this.statusMessage.set(`${this.selectedOptions['consistency'] || 'Hårdkokt'}<br>klar!`);
        clearInterval(this.interval);
      }
    }, 1000);
  }

  toggleTimer() {
    this.timerisRunning = !this.timerisRunning;
    if (this.timerisRunning) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timerisRunning = false;
  }

  resetTimer() {
    this.timeLeft.set(this.targetTime);
    clearInterval(this.interval);
    this.statusMessage.set(`Mål:<br>${this.selectedOptions['consistency'] || 'Hårdkokt'}`);
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

  toggleSelection(category: string) {
    this.selectedCategory =
      this.selectedCategory === category ? null : category;
  }

  selectEggOption(category: string, option: string) {
    this.selectedOptions[category] = option; // Inga fler typfel!
    this.selectedCategory = null; // Stäng alternativraden efter val

    this.calculateCookTime();
    console.log(`Vald ${category}: ${option}`);
  }
  calculateCookTime(): number {
    let mass = 53;
    const startTempEgg = this.selectedOptions['temperature'] === 'Kylskåpskallt' ? 4 : 20;
    let desiredTempEgg = 75;

    switch (this.selectedOptions['sizes']) {
      case 'Small': mass = 50; break;
      case 'Medium': mass = 58; break;
      case 'Large': mass = 68; break;
      case 'XLarge': mass = 75; break;
    }

    switch (this.selectedOptions['consistency']) {
      case 'Löskokt': desiredTempEgg = 63; break;
      case 'Mellankokt': desiredTempEgg = 68; break;
      case 'Hårdkokt': desiredTempEgg = 75; break;
    }

    this.time = this.eggQation(mass, 100, startTempEgg, 63);
    this.time1 = this.eggQation(mass, 100, startTempEgg, 68);
    this.time2 = this.eggQation(mass, 100, startTempEgg, 75);

    const selectedConsistency = this.selectedOptions['consistency'] || 'Hårdkokt';
    this.checkpoints = [];

    // ÄNDRING: Lägg endast till checkpoints om fler än 1 ägg
    if (this.eggCount > 1) {
      switch (selectedConsistency) {
        case 'Hårdkokt':
          this.targetTime = this.time2;
          this.checkpoints = [
            { time: this.targetTime - this.time1, message: 'Mellankokt' },
            { time: this.targetTime - this.time, message: 'Löskokt' }
          ];
          break;
        
        case 'Mellankokt':
          this.targetTime = this.time1;
          this.checkpoints = [
            { time: this.targetTime - this.time, message: 'Löskokt' }
          ];
          break;
        
        case 'Löskokt':
          this.targetTime = this.time;
          break;
      }
    } else {
      // ÄNDRING: Hantera targetTime för 1 ägg
      switch (selectedConsistency) {
        case 'Hårdkokt': this.targetTime = this.time2; break;
        case 'Mellankokt': this.targetTime = this.time1; break;
        case 'Löskokt': this.targetTime = this.time; break;
      }
      this.checkpoints = [];
    }

    this.checkpoints.sort((a, b) => b.time - a.time);
    this.timeLeft.set(this.targetTime);
    this.statusMessage.set(`Mål:<br>${selectedConsistency}`);

    return this.targetTime;
  }

  eggQation(
    mass: number,
    waterTemp: number,
    startTempEgg: number,
    desiredTempEgg: number
  ): number {
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

    return Math.round(time); // Tid i sekunder
  }

  // HEN ANIMATION
// Uppdatera beräkningen
henPosition = computed(() => {
  const progress = this.timeLeft() / (this.targetTime || 1);
  const angle = progress * 360;
  return `rotate(${angle}deg)`; // Returnera en korrekt CSS transform-sträng
});

  // Metod för att uppdatera hönans position direkt
  updateHenPosition() {
    const henElement = document.querySelector('.hen') as HTMLElement;
    if (henElement) {
      henElement.style.transform = this.henPosition();
    }
  }
}



