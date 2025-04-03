import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  imports: [CommonModule]  
})
export class RecipeComponent implements OnInit {
  eggRecipes: any[] = [];  // Lista för att lagra recepten

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadEggRecipes();  // Ladda recepten vid komponentens uppstart
    window.addEventListener('resize', this.updateRecipeVisibility.bind(this));  // Anpassa visning vid skärmstorlek
  }

  // Hämta recepten från API
  loadEggRecipes(): void {
    this.recipeService.getWeeklyRecipes().subscribe({
      next: (response) => {
        console.log('API-svar:', response);  // Logga API-responsen för att förstå strukturen
        this.eggRecipes = response.meals || [];  // Sätt recepten från API:s 'meals'

        // Kontrollera att recepten har bilder och ingredienser
        this.eggRecipes.forEach(recipe => {
          console.log('Bild för recept:', recipe.strMealThumb);  // Logga bild
          console.log('Ingredienser för recept:', recipe.strIngredient1);  // Logga ingredienser
        });

        this.updateRecipeVisibility();  // Uppdatera synligheten baserat på skärmstorlek
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);  // Hantera fel
      },
    });
  }

  // Anpassa visningen beroende på skärmstorlek
  updateRecipeVisibility(): void {
    const isDesktop = window.innerWidth >= 768;  // Kollar om det är en desktop
    this.eggRecipes.forEach(recipe => {
      recipe.showFullRecipe = isDesktop;  // Visa fullständigt recept på desktop
    });
  }

  // Växla mellan att visa mer eller mindre av receptet
  toggleRecipe(recipe: any): void {
    recipe.showFullRecipe = !recipe.showFullRecipe;  // Växla visning
  }

  // Hämta ingredienser från strIngredient1 till strIngredient20
  getIngredients(recipe: any): string[] {
    const ingredients = [];
    
    // Iterera genom strIngredient1 till strIngredient20
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe['strIngredient' + i];
      if (ingredient) {
        ingredients.push(ingredient);  // Lägg till ingrediensen om den finns
      }
    }
    
    return ingredients;
  }

  // Visa de första 4 ingredienserna
  getShortIngredients(recipe: any): string[] {
    return this.getIngredients(recipe).slice(0, 4);  // Visa de första 4 ingredienserna
  }

  // Visa ingredienser från index 5 och framåt
  getExtraIngredients(recipe: any): string[] {
    return this.getIngredients(recipe).slice(4);  // Visa ingredienser från index 5 och framåt
  }

  // Hämta instruktioner för receptet
  getInstructions(recipe: any): string {
    return recipe.strInstructions || 'Inga instruktioner tillgängliga för detta recept.';  // Standardmeddelande om inga instruktioner finns
  }
}
