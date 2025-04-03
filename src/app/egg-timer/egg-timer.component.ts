import { Component, computed, Input, signal } from '@angular/core';
import { ContinuousTimerButtonComponent } from '../continuous-timer-button/continuous-timer-button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { EggTipsComponent } from '../egg-tips/egg-tips.component';

@Component({
  selector: 'app-egg-timer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, EggTipsComponent],
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

  hoveredSize: string | null = null;
  hoveredConsistency: string | null = null;
  hoveredTemp: string | null = null;

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

  getSizeImageName(size: string, isHovered: boolean = false): string {
  const isSelected = this.selectedOptions['sizes'] === size;
  
  if (isSelected) {
    // Returnera rätt "pushed in"-bild för varje storlek
    const selectedImages: Record<string, string> = {
      Small: 'S_Pushed in.png',
      Medium: 'M_Pushed in.png',
      Large: 'L_Pushed in.png',
      XLarge: 'XL_Pushed in.png'
    };
    return selectedImages[size] || 'smallegg.png';
  }
  
  if (isHovered) {
    // Returnera hover-bilden för varje storlek
    const hoverImages: Record<string, string> = {
      Small: 'S_Hoover.png',
      Medium: 'M_Hoover.png',
      Large: 'L_Hoover.png',
      XLarge: 'XL_Hoover.png'
    };
    return hoverImages[size] || 'smallegg.png';
  }
  
  // Standardbild när inte hover eller selected
  const sizeImages: Record<string, string> = {
    Small: 'smallegg.png',
    Medium: 'mediumegg.png',
    Large: 'largeegg.png',
    XLarge: 'xlegg.png'
  };
  return sizeImages[size] || 'assets/images/default-egg.png';
}

getConcistencyImageName(consistency: string, isHovered: boolean = false): string {
  const isSelected = this.selectedOptions['consistency'] === consistency;
  
  if (isSelected) {
    return `${consistency}_Pushed in.png`;
  }
  
  if (isHovered) {
    // Returnera hover-bilden för varje konsistens
    const hoverImages: Record<string, string> = {
      Löskokt: 'Lös_Hoover.png',
      Mellankokt: 'Mellan_Hoover.png',
      Hårdkokt: 'Hård_Hoover.png'
    };
    return hoverImages[consistency] || 'löskokt.png';
  }
  
  // Standardbild när inte hover eller selected
  const consistencyImages: Record<string, string> = {
    Löskokt: 'löskokt.png',
    Mellankokt: 'mellankokt.png',
    Hårdkokt: 'hårdkokt.png'
  };
  return consistencyImages[consistency] || 'assets/images/default-egg.png';
}

  startTimer() {
    clearInterval(this.interval);

    this.interval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update((v) => v - 1);
        this.updateHenPosition();
      }

      if (this.eggCount > 1) {
        this.checkpoints.forEach((checkpoint) => {
          if (this.timeLeft() === checkpoint.time) {
            this.playSound();
            this.statusMessage.set(`Just nu:<br>${checkpoint.message}`);
          }
        });
      }

      if (this.timeLeft() === 0) {
        this.playSound();
        this.timerisRunning = false;
        this.statusMessage.set(
          `${this.selectedOptions['consistency'] || 'Hårdkokt'}<br>klar!`
        );
        clearInterval(this.interval);
      }
    }, 1000);
  }

  toggleTimer() {
    if (this.timerisRunning) {
      clearInterval(this.interval); // Se till att stoppa intervallet
      this.resetTimer(); // Återställ timern
      this.timerisRunning = false; // Sätt timern till stoppad status
    } else {
      this.startTimer(); // Starta timern
      this.timerisRunning = true;
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timerisRunning = false;
  }

  resetTimer() {
    this.timeLeft.set(this.targetTime);
    clearInterval(this.interval);
    this.statusMessage.set(
      `Mål:<br>${this.selectedOptions['consistency'] || 'Hårdkokt'}`
    );
  }

  playSound() {
    const audio = new Audio('/audio/chicSound.mp3');
    audio.play();
  }
  formatTime(seconds: number): string {
    const roundedSeconds = Math.round(seconds); // Se till att vi hanterar ett heltal
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;
    
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
    let mass = 60;
    const startTempEgg = this.selectedOptions['temperature'] === 'Kylskåpskallt' ? 4 : 20;
    let desiredTempEgg = 75;

    switch (this.selectedOptions['sizes']) {
      case 'Small': mass = 50; break;
      case 'Medium': mass = 60; break;
      case 'Large': mass = 70; break;
      case 'XLarge': mass = 80; break;
    }

    switch (this.selectedOptions['consistency']) {
      case 'Löskokt': desiredTempEgg = 65; break;
      case 'Mellankokt': desiredTempEgg = 73; break;
      case 'Hårdkokt': desiredTempEgg = 83; break;
    }

    this.time = this.eggQation(mass, 100, startTempEgg, 65);
    this.time1 = this.eggQation(mass, 100, startTempEgg, 73);
    this.time2 = this.eggQation(mass, 100, startTempEgg, 83);

    const selectedConsistency = this.selectedOptions['consistency'] || 'Hårdkokt';
    this.checkpoints = [];

    if (this.eggCount > 1) {
      const extraTime = Math.max(0, this.eggCount - 1) * 0.1;

      switch (selectedConsistency) {
        case 'Hårdkokt':
          this.targetTime = this.time2 * (1 + extraTime);
          this.checkpoints = [
            { time: this.targetTime - this.time1, message: 'Mellankokt' },
            { time: this.targetTime - this.time, message: 'Löskokt' }
          ];
          break;
        case 'Mellankokt':
          this.targetTime = this.time1 * (1 + extraTime);
          this.checkpoints = [
            { time: this.targetTime - this.time, message: 'Löskokt' }
          ];
          break;
        case 'Löskokt':
          this.targetTime = this.time * (1 + extraTime);
          break;
      }
    } else {
      switch (selectedConsistency) {
        case 'Hårdkokt': this.targetTime = this.time2; break;
        case 'Mellankokt': this.targetTime = this.time1; break;
        case 'Löskokt': this.targetTime = this.time; break;
      }
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
    // Baserat på empiriska data och fysikaliska modeller
    const baseTime: Record<string, number> = {
      'Löskokt': 240,    // 4 min bastid för medium ägg (60g)
      'Mellankokt': 420,  // 7 min
      'Hårdkokt': 600     // 10 min
    };
  
    // Justering för äggstorlek (kvadratrotsfaktor pga volym/area-förhållande)
    const sizeFactor = Math.sqrt(mass / 60);
  
    // Justering för starttemperatur
    const tempFactor = 1 + (20 - startTempEgg) * 0.015;
  
    let time: number;
    
    switch (desiredTempEgg) {
      case 65: time = baseTime['Löskokt']; break;
      case 73: time = baseTime['Mellankokt']; break;
      case 83: time = baseTime['Hårdkokt']; break;
      default: time = 300; // Fallback
    }
  
    // Slutlig beräkning med justeringar
    time = time * sizeFactor * tempFactor;
  
    return Math.round(time);
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
