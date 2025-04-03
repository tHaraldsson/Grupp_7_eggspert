import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common';  // Importera CommonModule

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  imports: [CommonModule]  // Lägg till CommonModule här
})
export class RecipeComponent implements OnInit {
  eggRecipes: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadEggRecipes();  // Ladda recepten vid komponentens uppstart
    window.addEventListener('resize', this.updateRecipeVisibility.bind(this));  // Anpassa visning vid skärmstorlek
  }

  loadEggRecipes(): void {
    this.recipeService.getWeeklyRecipes().subscribe({
      next: (recipes) => {
        this.eggRecipes = recipes;
        this.updateRecipeVisibility();
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  updateRecipeVisibility(): void {
    const isDesktop = window.innerWidth >= 768;  // Kollar om det är en desktop
    this.eggRecipes.forEach(recipe => {
      recipe.showFullRecipe = isDesktop;  // Visa fullständigt recept på desktop
    });
  }

  toggleRecipe(recipe: any): void {
    recipe.showFullRecipe = !recipe.showFullRecipe;  // Växla visning
  }

  getIngredients(recipe: any): string[] {
    return recipe.extendedIngredients
      ? recipe.extendedIngredients.map((ingredient: any) => `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`)
      : [];
  }

  getShortIngredients(recipe: any): string[] {
    return this.getIngredients(recipe).slice(0, 4);  // Visa bara de första 4 ingredienserna
  }

  getExtraIngredients(recipe: any): string[] {
    return this.getIngredients(recipe).slice(4);  // Visa ingredienser från index 5 och framåt
  }

  // Kontrollera om instruktionerna finns och om de är tomma
  getInstructions(recipe: any): string {
    return recipe.instructions || 'Inga instruktioner tillgängliga för detta recept.';
  }
}
