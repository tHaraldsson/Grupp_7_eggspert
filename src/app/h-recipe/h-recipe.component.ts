import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-h-recipe',
  templateUrl: './h-recipe.component.html',
  styleUrls: ['./h-recipe.component.css'],
  imports: [CommonModule],
})
export class HRecipeComponent implements OnInit, OnDestroy {
  screenIsMobile = window.innerWidth < 768;
  eggRecipes1 = !this.screenIsMobile; // Initiera direkt baserat på skärmstorlek
  eggRecipes2 = !this.screenIsMobile;
  eggRecipes3 = !this.screenIsMobile;
  
  private resizeObserver: ResizeObserver | undefined;

  constructor(
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setupResizeObserver();
    this.updateRecipeVisibility();
  }

  ngOnDestroy(): void {
    this.cleanupResizeObserver();
  }

  private setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateRecipeVisibility();
      });
      this.resizeObserver.observe(document.body);
    } else {
      window.addEventListener('resize', this.debouncedUpdate.bind(this));
    }
  }

  private cleanupResizeObserver(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    } else {
      window.removeEventListener('resize', this.debouncedUpdate.bind(this));
    }
  }

  private debounceTimer: any;
  private debouncedUpdate() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.updateRecipeVisibility();
      this.cdr.detectChanges();
    }, 100);
  }

  updateRecipeVisibility(): void {
    const newMobileStatus = window.innerWidth < 768;
    
    if (this.screenIsMobile !== newMobileStatus) {
      this.screenIsMobile = newMobileStatus;
      
      // I desktop-läge, expandera alla recept
      if (!this.screenIsMobile) {
        this.eggRecipes1 = true;
        this.eggRecipes2 = true;
        this.eggRecipes3 = true;
      }
      // I mobil-läge, behåll nuvarande tillstånd eller komprimera om du vill
      
      this.cdr.detectChanges();
    }
  }

  toggleRecipe(recipe: 'eggRecipes1' | 'eggRecipes2' | 'eggRecipes3'): void {
    // Tillåt endast att växla i mobil-läge
    if (this.screenIsMobile) {
      this[recipe] = !this[recipe];
      // Stabilisera layouten
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
    }
  }
}