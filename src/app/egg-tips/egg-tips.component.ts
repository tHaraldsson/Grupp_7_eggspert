import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { EggTipsService } from '../services/egg-tips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egg-tips',
  imports: [CommonModule],
  templateUrl: './egg-tips.component.html',
  styleUrls: ['./egg-tips.component.css'],
})
export class EggTipsComponent implements OnInit {
  eggTips: any[] = []; // Håller äggtipsen som hämtas från API:et
  errorMessage: string = ''; // För eventuella felmeddelanden

  eggTipNumber: number = 0;
  lastTipButtonClass: string = 'disabled';
  nextTipButtonClass: string = '';

  constructor(private eggTipsService: EggTipsService) {}

  ngOnInit(): void {
    this.fetchEggTips(); // Hämta äggtips när komponenten laddas
    this.eggTipNumber = 0;
  }

  fetchEggTips(): void {
    this.eggTipsService.getEggTips().subscribe(
      (data) => {
        this.eggTips = data; // Tilldela data till eggTips
      },
      (error) => {
        this.errorMessage = 'Kunde inte hämta äggtipsen. Försök igen senare.'; // Om något går fel
      }
    );
  }

  eggTipNumberChange(change: number): void {
    if (
      this.eggTipNumber + change >= 0 &&
      this.eggTipNumber + change < this.eggTips.length
    ) {
      this.eggTipNumber = this.eggTipNumber + change;
      console.log(this.eggTipNumber);
    }
    this.updateButtonStatus();
  }

  updateButtonStatus(): void {
    if (this.eggTipNumber <= 0) {
      this.lastTipButtonClass = 'disabled';
    } else {
      this.lastTipButtonClass = '';
    }
    if (this.eggTipNumber >= this.eggTips.length - 1) {
      this.nextTipButtonClass = 'disabled';
    } else {
      this.nextTipButtonClass = '';
    }
  }
}

