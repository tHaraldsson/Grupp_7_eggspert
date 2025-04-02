import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe',
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {
  eggRecipes: any[] = [];

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=egg';
  private apiKey = 'e29ca641a7814ec58e9c4d1ebf0d7dfd';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadEggRecipes();
  }

  loadEggRecipes(): void {
    this.httpClient.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.eggRecipes = response.meals || [];
        // Lägg till flagga för varje recept om det ska visa hela beskrivningen
        this.eggRecipes.forEach(recipe => {
          recipe.showFullRecipe = false;  // Starta med att inte visa hela beskrivningen
        });
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
    });
  }

  toggleRecipe(recipe: any): void {
    recipe.showFullRecipe = !recipe.showFullRecipe; // Växla mellan att visa och dölja full beskrivning
  }

  getIngredients(recipe: any): string[] {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (recipe['strIngredient' + i]) {
        ingredients.push(recipe['strIngredient' + i] + ' - ' + recipe['strMeasure' + i]);
      }
    }
    return ingredients;
  }

  getShortIngredients(recipe: any): string[] {
    return this.getIngredients(recipe).slice(0, 4); // Visa de första 5 ingredienserna
  }

  getExtraIngredients(recipe: any): string[] {
    return this.getIngredients(recipe).slice(4); // Visa ingredienser från index 5 och framåt
  }
}
 
