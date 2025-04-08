import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-h-recipe',
  templateUrl: './h-recipe.component.html',
  styleUrls: ['./h-recipe.component.css'],
  imports: [CommonModule],
})
export class HRecipeComponent implements OnInit {
  screenIsMobile = window.innerWidth < 768; // Kolla om det är mobil
  eggRecipes1 = <boolean>false;
  eggRecipes2 = <boolean>false;
  eggRecipes3 = <boolean>false;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    window.addEventListener('resize', this.updateRecipeVisibility.bind(this)); // Anpassa visning vid skärmstorlek

    this.updateRecipeVisibility();

  }

  updateRecipeVisibility(): void {
    this.screenIsMobile = window.innerWidth < 768; // Uppdatera mobilstatus
    const isDesktop = !this.screenIsMobile;

    this.eggRecipes1 = isDesktop;
    this.eggRecipes2 = isDesktop;
    this.eggRecipes3 = isDesktop;
  }

  // Växla mellan att visa mer eller mindre av receptet
  toggleRecipe(eggRecipes: boolean): boolean {
    eggRecipes = !eggRecipes; // Växla visning
    return eggRecipes;
  }
}
