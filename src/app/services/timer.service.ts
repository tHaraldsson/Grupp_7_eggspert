import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService implements OnDestroy {
  private timerInterval: any;
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private notificationSound: HTMLAudioElement | null = null;
  
  public timeLeft = new Subject<number>();
  public timerCompleted = new Subject<void>();
  public statusMessage = new Subject<string>();

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    try {
      // För HTML5 Audio fallback
      this.notificationSound = new Audio('/audio/chicSound.mp3');
      this.notificationSound.load();

      // För Web Audio API
      if (typeof window.AudioContext !== 'undefined') {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    } catch (e) {
      console.error('Audio initialization failed:', e);
    }
  }

  async playSound() {
    try {
      // Försök med Web Audio API först
      if (this.audioContext && !this.audioBuffer) {
        const response = await fetch('/audio/chicSound.mp3');
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      }

      if (this.audioContext && this.audioBuffer) {
        const source = this.audioContext.createBufferSource();
        source.buffer = this.audioBuffer;
        source.connect(this.audioContext.destination);
        source.start(0);
        return;
      }

      // Fallback till HTML5 Audio
      if (this.notificationSound) {
        this.notificationSound.currentTime = 0;
        await this.notificationSound.play();
      }
    } catch (error) {
      console.error('Ljuduppspelning misslyckades:', error);
      this.playFallbackSound();
    }
  }

  private playFallbackSound() {
    try {
      const audio = new Audio('/audio/chicSound.mp3');
      audio.play().catch(e => console.error('Fallback ljud misslyckades', e));
    } catch (e) {
      console.error('Fallback sound initialization failed:', e);
    }
  }

  startTimer(duration: number, consistency: string) {
    this.stopTimer();
    let remaining = duration;
    this.timeLeft.next(remaining);
    this.statusMessage.next(`Mål:<br>${consistency}`);
  
    this.timerInterval = setInterval(() => {
      remaining--;
      this.timeLeft.next(remaining);
  
      if (remaining <= 0) {
        this.stopTimer();
        this.timerCompleted.next();
        this.statusMessage.next(`${consistency} klar!`);
        this.playSound();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }
}