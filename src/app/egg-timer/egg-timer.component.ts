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

  // Screen lock prevention properties
  wakeLock: any = null;
  wakeLockSupported = false;
  silentAudio: HTMLAudioElement | null = null;
  keepAwakeVideo: HTMLVideoElement | null = null;

  notificationSound: HTMLAudioElement | null = null;

  private audioContext: AudioContext | null = null;

  ngOnInit() {
<<<<<<< Updated upstream
    this.calculateCookTime();
    // Check if the Wake Lock API is supported
    this.wakeLockSupported = 'wakeLock' in navigator;
    // Preload the notification sound
    this.notificationSound = new Audio('/audio/chicSound.mp3');
    this.notificationSound.load(); // Explicitly load the audio
=======
     // När sidan laddas ska timern vara 00:00
     this.timeLeft.set(0); // Starta med 0 sekunder
     this.statusMessage.set('<br>');
>>>>>>> Stashed changes
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
        XLarge: 'XL_Pushed in.png',
      };
      return selectedImages[size] || 'smallegg.png';
    }

    if (isHovered) {
      // Returnera hover-bilden för varje storlek
      const hoverImages: Record<string, string> = {
        Small: 'S_Hoover.png',
        Medium: 'M_Hoover.png',
        Large: 'L_Hoover.png',
        XLarge: 'XL_Hoover.png',
      };
      return hoverImages[size] || 'smallegg.png';
    }

    // Standardbild när inte hover eller selected
    const sizeImages: Record<string, string> = {
      Small: 'smallegg.png',
      Medium: 'mediumegg.png',
      Large: 'largeegg.png',
      XLarge: 'xlegg.png',
    };
    return sizeImages[size] || 'assets/images/default-egg.png';
  }

  getConcistencyImageName(
    consistency: string,
    isHovered: boolean = false
  ): string {
    const isSelected = this.selectedOptions['consistency'] === consistency;

    if (isSelected) {
      return `${consistency}_Pushed in.png`;
    }

    if (isHovered) {
      // Returnera hover-bilden för varje konsistens
      const hoverImages: Record<string, string> = {
        Löskokt: 'Lös_Hoover.png',
        Mellankokt: 'Mellan_Hoover.png',
        Hårdkokt: 'Hård_Hoover.png',
      };
      return hoverImages[consistency] || 'löskokt.png';
    }

    // Standardbild när inte hover eller selected
    const consistencyImages: Record<string, string> = {
      Löskokt: 'löskokt.png',
      Mellankokt: 'mellankokt.png',
      Hårdkokt: 'hårdkokt.png',
    };
    return consistencyImages[consistency] || 'assets/images/default-egg.png';
  }

  startTimer() {
<<<<<<< Updated upstream
    clearInterval(this.interval);
    this.preventScreenLock(); // Prevent screen from locking

    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    this.playSilentActivationSound();
=======
    // Se till att timern inte är igång
    if (this.timerisRunning) return;

    this.calculateCookTime(); // Beräkna koktiden baserat på val
    this.timerisRunning = true;
    localStorage.setItem('timerRunning', 'true'); // Spara status i localStorage
>>>>>>> Stashed changes

    this.interval = setInterval(() => {
      if (this.timeLeft() > 0) {
        this.timeLeft.update((v) => v - 1); // Minska tiden varje sekund
      } else {
        this.statusMessage.set(`${this.selectedOptions['consistency'] || 'Hårdkokt'}<br>klar!`);
        clearInterval(this.interval); // Stoppa timern när den når 0
        this.timerisRunning = false;
<<<<<<< Updated upstream
        this.statusMessage.set(
          `${this.selectedOptions['consistency'] || 'Hårdkokt'}<br>klar!`
        );
        clearInterval(this.interval);
        this.allowScreenLock(); // Allow screen to lock when timer completes
=======
        localStorage.removeItem('timerRunning'); // Ta bort timerstatus från localStorage
>>>>>>> Stashed changes
      }
    }, 1000);
  }

  toggleTimer() {
    if (this.timerisRunning) {
      clearInterval(this.interval); // Se till att stoppa intervallet
      this.resetTimer(); // Återställ timern
      this.timerisRunning = false; // Sätt timern till stoppad status
      this.allowScreenLock(); // Allow screen to lock when timer stops
    } else {
      this.startTimer(); // Starta timern
      this.timerisRunning = true;
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timerisRunning = false;
    this.allowScreenLock(); // Allow screen to lock when timer pausas
  }

  resetTimer() {
    this.timeLeft.set(0); // Sätt timeLeft till 0 när vi nollställer
    clearInterval(this.interval); // Stoppa intervallet om det körs
    this.statusMessage.set('<br>'); // Visa en status att timern är nollställd

     // Nollställ valda alternativ
  this.selectedOptions = {}; // Töm alla val av ägginställningar
  }

  async playSound() {
    try {
      // Skapa nytt AudioContext vid första användning
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
  
      // Hämta ljuddata
      const response = await fetch('/audio/chicSound.mp3');
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      // Spela upp ljudet
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error('Web Audio API error:', error);
      // Fallback till vanligt ljudelement
      this.playFallbackSound();
    }
  }
<<<<<<< Updated upstream

  private playFallbackSound() {
    const audio = new Audio('/audio/chicSound.mp3');
    audio.play().catch(error => {
      console.error('Fallback sound error:', error);
    });
  }

  private playSilentActivationSound() {
    const silentAudio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    silentAudio.play().catch(e => console.debug('Silent activation sound error:', e));
  }

=======
  
>>>>>>> Stashed changes
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
    this.selectedOptions[category] = option;
    this.selectedCategory = null; // Stäng alternativraden efter val

    this.calculateCookTime();
    console.log(`Vald ${category}: ${option}`);
  }

  calculateCookTime(): number {
    let mass = 60;
    const startTempEgg =
      this.selectedOptions['temperature'] === 'Kylskåpskallt' ? 4 : 20;
    let desiredTempEgg = 75;

    switch (this.selectedOptions['sizes']) {
      case 'Small':
        mass = 50;
        break;
      case 'Medium':
        mass = 60;
        break;
      case 'Large':
        mass = 70;
        break;
      case 'XLarge':
        mass = 80;
        break;
    }

    switch (this.selectedOptions['consistency']) {
      case 'Löskokt':
        desiredTempEgg = 65;
        break;
      case 'Mellankokt':
        desiredTempEgg = 73;
        break;
      case 'Hårdkokt':
        desiredTempEgg = 83;
        break;
    }

    this.time = this.eggQation(mass, 100, startTempEgg, 65);
    this.time1 = this.eggQation(mass, 100, startTempEgg, 73);
    this.time2 = this.eggQation(mass, 100, startTempEgg, 83);

    const selectedConsistency =
      this.selectedOptions['consistency'] || 'Hårdkokt';
    this.checkpoints = [];

    if (this.eggCount > 1) {
      const extraTime = Math.max(0, this.eggCount - 1) * 0.1;

      switch (selectedConsistency) {
        case 'Hårdkokt':
          this.targetTime = this.time2 * (1 + extraTime);
          this.checkpoints = [
            { time: this.targetTime - this.time1, message: 'Mellankokt' },
            { time: this.targetTime - this.time, message: 'Löskokt' },
          ];
          break;
        case 'Mellankokt':
          this.targetTime = this.time1 * (1 + extraTime);
          this.checkpoints = [
            { time: this.targetTime - this.time, message: 'Löskokt' },
          ];
          break;
        case 'Löskokt':
          this.targetTime = this.time * (1 + extraTime);
          break;
      }
    } else {
      switch (selectedConsistency) {
        case 'Hårdkokt':
          this.targetTime = this.time2;
          break;
        case 'Mellankokt':
          this.targetTime = this.time1;
          break;
        case 'Löskokt':
          this.targetTime = this.time;
          break;
      }
    }

    this.checkpoints.sort((a, b) => b.time - a.time);
    this.timeLeft.set(this.targetTime);
    this.statusMessage.set(`<br>${selectedConsistency}`);

    return this.targetTime;
  }

  eggQation(
    mass: number,
    waterTemp: number,
    startTempEgg: number,
    desiredTempEgg: number
  ): number {
    // Definiera basetiderna med en typ som explicit tillåter strängindex
    const baseTimes: Record<string, number> = {
      '65': 255, // Löskokt: 4:15
      '73': 405, // Mellankokt: 6:45
      '83': 570, // Hårdkokt: 9:30
    };

    // Milder storlekspåverkan
    const sizeFactor = Math.pow(mass / 60, 0.35);

    // Mindre temperaturpåverkan
    const tempAdjustment = 1 + (20 - startTempEgg) * 0.007;

    // Säker åtkomst till basetiderna
    const desiredTempKey = desiredTempEgg.toString();
    const baseTime = baseTimes[desiredTempKey] ?? 300; // Använd nullish coalescing

    // Beräkna tid
    let time = baseTime * sizeFactor * tempAdjustment;

    // Extra justering för hårdkokt
    if (desiredTempEgg >= 80) {
      time *= 1.03;
    }

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

  // Screen lock prevention methods
  preventScreenLock() {
    if (this.wakeLockSupported) {
      // Use Wake Lock API for supported browsers (most Android devices)
      this.requestWakeLock();
    } else {
      // Use fallback for iOS and unsupported browsers
      this.preventSleepIOS();
    }
  }

  allowScreenLock() {
    if (this.wakeLockSupported && this.wakeLock) {
      this.wakeLock.release().catch((error: Error) => console.error(error));
      this.wakeLock = null;
    } else {
      this.allowSleepIOS();
    }
  }

  // For Android and supported browsers
  async requestWakeLock() {
    if (!this.wakeLockSupported) return;

    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      console.log('Wake Lock active');

      this.wakeLock.addEventListener('release', () => {
        console.log('Wake Lock released');
        this.wakeLock = null;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Wake Lock error: ${error.name}, ${error.message}`);
      } else {
        console.error('Wake Lock error:', error);
      }
    }
  }

  // For iOS devices
  preventSleepIOS() {
    // Method 1: Create silent audio
    if (!this.silentAudio) {
      this.silentAudio = new Audio('/audio/silent-sound.mp3');
      this.silentAudio.loop = true;
      this.silentAudio
        .play()
        .catch((error: Error) =>
          console.log('Silent audio play failed:', error)
        );
    }

    // Method 2: Create a video element
    if (!this.keepAwakeVideo) {
      this.keepAwakeVideo = document.createElement('video');
      this.keepAwakeVideo.setAttribute('playsinline', '');
      this.keepAwakeVideo.setAttribute('muted', '');
      this.keepAwakeVideo.setAttribute('width', '1');
      this.keepAwakeVideo.setAttribute('height', '1');
      this.keepAwakeVideo.style.position = 'absolute';
      this.keepAwakeVideo.style.opacity = '0.01';
      document.body.appendChild(this.keepAwakeVideo);

      // Create a canvas as a video source
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 1, 1);
      }

      // Convert canvas to blob and set as video source
      canvas.toBlob((blob) => {
        if (blob && this.keepAwakeVideo) {
          this.keepAwakeVideo.src = URL.createObjectURL(blob);
          this.keepAwakeVideo
            .play()
            .catch((error: Error) => console.log('Video play failed:', error));
        }
      });
    } else if (this.keepAwakeVideo) {
      this.keepAwakeVideo
        .play()
        .catch((error: Error) => console.log('Video play failed:', error));
    }
  }

  allowSleepIOS() {
    // Stop silent audio
    if (this.silentAudio) {
      this.silentAudio.pause();
      this.silentAudio = null;
    }

    // Remove video element
    if (this.keepAwakeVideo) {
      this.keepAwakeVideo.pause();
      if (this.keepAwakeVideo.parentNode) {
        this.keepAwakeVideo.parentNode.removeChild(this.keepAwakeVideo);
      }
      this.keepAwakeVideo = null;
    }
  }
}
