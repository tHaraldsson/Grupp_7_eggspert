import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EggTipsService } from '../services/egg-tips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finished-egg-tips',
  templateUrl: './finished-egg-tips.component.html',
  styleUrls: ['./finished-egg-tips.component.css'],
  imports: [CommonModule]
})
export class FinishedEggTipsComponent implements OnInit {
  @Input() tips: any[] = [];
  @Output() close = new EventEmitter<void>();

  currentTipIndex = 0;
  isVisible = false;

  

  constructor(private eggTipsService: EggTipsService) {}

  ngOnInit() {
  this.eggTipsService.getEggTips().subscribe(tips => {
    this.tips = tips;
    this.currentTipIndex = Math.floor(Math.random() * tips.length);
    this.show(); // Lägg till detta anrop
  });
}

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }

  nextTip() {
    if (this.currentTipIndex < this.tips.length - 1) {
      this.currentTipIndex++;
    }
  }

  prevTip() {
    if (this.currentTipIndex > 0) {
      this.currentTipIndex--;
    }
  }

  closeModal() {
    this.close.emit();
  }

}