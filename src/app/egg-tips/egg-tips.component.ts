import { Component, OnInit } from '@angular/core';
import { EggTipsService } from '../services/egg-tips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-egg-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './egg-tips.component.html',
  styleUrl: './egg-tips.component.css'
})
export class EggTipsComponent implements OnInit{
  eggTips: any[] = [];  // Håller äggtipsen som hämtas från API:et
  errorMessage: string = '';  // För eventuella felmeddelanden

  constructor(private eggTipsService: EggTipsService) {}

  ngOnInit(): void {
    this.fetchEggTips();  // Hämta äggtips när komponenten laddas
  }

  fetchEggTips(): void {
    this.eggTipsService.getEggTips().subscribe(
      (data) => {
        this.eggTips = data;  // Tilldela data till eggTips
      },
      (error) => {
        this.errorMessage = 'Kunde inte hämta äggtipsen. Försök igen senare.';  // Om något går fel
      }
    );
  }
}
