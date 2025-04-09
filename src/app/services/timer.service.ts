import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimerService implements OnDestroy {
  private timerInterval: any;
  private audioContext: AudioContext | null = null;
  private audioBuffer: AudioBuffer | null = null;
  private isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  public timeLeft = new Subject<number>();
  public timerCompleted = new Subject<void>();
  public statusMessage = new Subject<string>();
  public timerCheckpoints = new Subject<{ time: number; message: string }>();
  public timerContinuos = new Subject<boolean>();

  constructor() {
    this.initializeAudio();
  }

  private initializeAudio() {
    if (typeof window.AudioContext !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playSilentActivationSound() {
    if (!this.isIOS) return;

    const silentAudio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
    silentAudio.play().catch(e => console.debug('Silent activation error:', e));
  }

  async playSound() {
    try {
      if (!this.audioContext) return;

      // Ladda ljudet vid första användning
      if (!this.audioBuffer) {
        const response = await fetch('/audio/chicSound.mp3');
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      }

      // Spela upp ljudet
      const source = this.audioContext.createBufferSource();
      source.buffer = this.audioBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);

    } catch (error) {
      console.error('Web Audio Error:', error);
      this.playHtml5Fallback();
    }
  }

  private playHtml5Fallback() {
    const audio = new Audio('/audio/chicSound.mp3');
    audio.play().catch(e => console.error('HTML5 Audio Error:', e));
  }

  async startTimer(duration: number, consistency: string) {
    this.stopTimer();
    this.playSilentActivationSound();

    let remaining = duration;
    this.timeLeft.next(remaining);
    this.statusMessage.next(`Mål:<br>${consistency}`);

    this.timerInterval = setInterval(() => {
      remaining--;
      this.timeLeft.next(remaining);
      if (this.timerContinuos) {
        this.timerCheckpoints.forEach((checkpoint) => {
          if (remaining === checkpoint.time) {
            this.playSound();
            //this.statusMessage.set(`Just nu:<br>${checkpoint.message}`);
          }
        });
      }

      if (remaining <= 0) {
        this.stopTimer();
        this.timerCompleted.next();
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
