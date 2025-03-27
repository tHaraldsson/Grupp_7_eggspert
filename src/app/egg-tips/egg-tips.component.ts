import {
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { EggTipsService } from '../services/egg-tips.service';
import { CommonModule } from '@angular/common';
import { __values } from 'tslib';

@Component({
  selector: 'app-egg-tips',
  imports: [CommonModule],
  templateUrl: './egg-tips.component.html',
  styleUrl: './egg-tips.component.css',
})
export class EggTipsComponent implements OnInit {
  eggTips: any[] = []; // Håller äggtipsen som hämtas från API:et
  errorMessage: string = ''; // För eventuella felmeddelanden
  eggTipNumber: number = 0;
  @ViewChild('nextTipButton') nextTipButton!: HTMLButtonElement;
  @ViewChild('lastTipButton') lastTipButton!: HTMLButtonElement;

  constructor(private eggTipsService: EggTipsService) {}

  ngOnInit(): void {
    this.fetchEggTips(); // Hämta äggtips när komponenten laddas
    this.eggTipNumber = 0;
  }

 /* ngAfterViewInit(): void {
    this.uppdateButtonStatus();
  }*/

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
    //this.uppdateButtonStatus();
  }

  /*uppdateButtonStatus(): void {
    if (this.lastTipButton && this.nextTipButton) {
      if (
        this.eggTipNumber <=
        0 && this.lastTipButton.classList.contains('disabled')
      ) {
        this.lastTipButton.classList.add('disabled');
        this.lastTipButton.disabled = true;
      } if(!this.lastTipButton.classList.contains('disabled')) else {
        this.lastTipButton.disabled = false;
        this.lastTipButton.classList.remove('disabled');
      }
      if (
        this.eggTipNumber >= this.eggTips.length &&
        this.nextTipButton.classList.contains('disabled')
      ) {
        this.nextTipButton.classList.add('disabled');
        this.nextTipButton.disabled = true;
      } else if (!this.nextTipButton.classList.contains('disabled')) {
        this.nextTipButton.disabled = false;
        this.nextTipButton.classList.remove('disabled');
      }
    }
  }*/
}
