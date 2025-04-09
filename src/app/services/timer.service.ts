import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService implements OnDestroy {
  private timerInterval: any;
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  private soundEnabled = false;
  private checkpoints: { time: number; message: string }[] = [];

  public timeLeft = new Subject<number>();
  public timerCompleted = new Subject<void>();
  public statusMessage = new Subject<string>();
  public timerCheckpoints = new Subject<{ time: number; message: string }[]>();
  public timerContinuous = new Subject<boolean>();

  constructor() {
    // Don't initialize audio until user interaction
  }

  // Call this method when user interacts (e.g., clicks start button)
  public initializeAudio() {
    if (typeof window.AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined') {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.soundEnabled = true;
        this.preloadSound();
      } catch (e) {
        console.error('AudioContext initialization failed:', e);
      }
    }

    // Always try the HTML5 Audio fallback initialization as well
    this.initializeHTML5Audio();
  }

  private initializeHTML5Audio() {
    // Create and immediately play a silent sound to unlock audio
    const silentSound = new Audio();
    silentSound.src = "data:audio/mp3;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbns...";
    silentSound.volume = 0.01; // Very low but not zero
    silentSound.play()
      .then(() => {
        console.log("HTML5 Audio initialized successfully");
        this.soundEnabled = true;
      })
      .catch(err => console.warn("HTML5 Audio initialization failed:", err));
  }

  private async preloadSound() {
    // Only preload if audio context is available
    if (!this.audioContext) return;
    
    try {
      const response = await fetch('/audio/chicSound.mp3');
      const arrayBuffer = await response.arrayBuffer();
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      console.log("Sound preloaded successfully");
    } catch (error) {
      console.error('Error preloading sound:', error);
    }
  }

  async playSound(repeats: number = 5) {
    // Försök först med Web Audio API
    if (this.audioContext && this.audioBuffer) {
      try {
        // Resume context if it was suspended
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }
  
        // Spela ljudet med en fördröjning
        for (let i = 0; i < repeats; i++) {
          if (i > 0) {
            await this.delay(1000); // Vänta 1 sekund efter den första uppspelningen
          }
          const source = this.audioContext.createBufferSource();
          source.buffer = this.audioBuffer;
          source.connect(this.audioContext.destination);
          source.start(0); // Spela ljudet omedelbart
        }
        return; // Om Web Audio lyckas, stoppa här
      } catch (error) {
        console.warn('Web Audio playback failed, trying HTML5 fallback:', error);
      }
    }
  
    // Fallback till HTML5 Audio
    this.playHTML5Sound(repeats);
  }
  
  private playHTML5Sound(repeats: number) {
    for (let i = 0; i < repeats; i++) {
      setTimeout(() => {
        const audio = new Audio('/audio/chicSound.mp3');
        audio.volume = 1.0;
        audio.play()
          .catch(error => {
            console.error('HTML5 Audio playback failed:', error);
            this.statusMessage.next('🔇 Ljud ej tillgängligt');
          });
      }, 1000 * i); // Vänta 1 sekund mellan varje uppspelning
    }
  }
  

  // Funktion för att skapa en fördröjning (i millisekunder)
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async startTimer(duration: number, consistency: string, checkpoints: { time: number; message: string }[] = []) {
    // Initialize audio on user interaction
    this.initializeAudio();
    
    // Stop any existing timer
    this.stopTimer();
    
    // Store checkpoints for later use
    this.checkpoints = [...checkpoints];
    
    // Set initial values
    let remaining = duration;
    this.timeLeft.next(remaining);
    this.statusMessage.next(`Mål:<br>${consistency}`);

    // Create timer with 1-second interval
    this.timerInterval = setInterval(() => {
      remaining--;
      this.timeLeft.next(remaining);
      
      // Check for checkpoints
      const checkpoint = this.checkpoints.find(cp => cp.time === remaining);
      if (checkpoint) {
        this.playSound();
        this.statusMessage.next(`Just nu:<br>${checkpoint.message}`);
      }

      // Check if timer completed
      if (remaining <= 0) {
        this.stopTimer();
        this.timerCompleted.next();
        this.playSound(5); // Spela ljudet 5 gånger
      }
    }, 1); // 1 sekund mellan varje uppdatering
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopTimer();
    
    // Clean up audio resources
    if (this.audioContext) {
      this.audioContext.close().catch(e => console.error("Error closing AudioContext:", e));
      this.audioContext = null;
    }
  }
}
