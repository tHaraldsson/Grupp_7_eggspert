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
  eggRecipes1 = false;
  eggRecipes2 = false;
  eggRecipes3 = false;
  
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
    
    // Uppdatera bara om skärmstorleken ändrat status (mobil/desktop)
    if (this.screenIsMobile !== newMobileStatus) {
      this.screenIsMobile = newMobileStatus;
      const isDesktop = !this.screenIsMobile;
      
      this.eggRecipes1 = isDesktop;
      this.eggRecipes2 = isDesktop;
      this.eggRecipes3 = isDesktop;
      
      this.cdr.detectChanges();
    }
  }

  toggleRecipe(recipe: 'eggRecipes1' | 'eggRecipes2' | 'eggRecipes3'): void {
    this[recipe] = !this[recipe];
    // Stabilisera layouten
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
  }
}