import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { forkJoin, Observable } from 'rxjs'; // Importera Observable och forkJoin

interface Recipe {
  title: string;
  image: string;
  summary: string;
  instructions: string;
  ingredients: Array<{
    name: string;
  }>;
}

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  eggRecipes: Recipe[] = []; // Typa eggRecipes som en array av Recipe

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    // Hämta recepten från RecipeService
    this.recipeService.getWeeklyRecipes().subscribe({
      next: (data) => {
        console.log('API-svar:', data);

        // Skapa en array av observables för att hämta detaljer om varje recept
        const recipeDetailsObservables: Observable<any>[] = data.results.map((recipe: any) => {
          return this.recipeService.getRecipeDetails(recipe.id);
        });

        // Vänta på att alla observables ska slutföras med hjälp av forkJoin
        forkJoin(recipeDetailsObservables).subscribe({
          next: (recipesDetails: any[]) => { // Typa recipesDetails som en array av any
            // Här använder vi en säker typ, om vi vet att det kommer vara en lista av Recipe
            this.eggRecipes = recipesDetails.map((recipeDetails) => ({
              title: recipeDetails.title || 'Ingen rubrik',
              image: recipeDetails.image || 'default-image-url',
              summary: recipeDetails.summary || 'Ingen beskrivning tillgänglig',
              instructions: recipeDetails.instructions || 'Inga instruktioner tillgängliga',
              ingredients: recipeDetails.extendedIngredients || []
            }));
          },
          error: (error) => {
            console.error('Fel vid hämtning av receptdetaljer:', error);
          }
        });
      },
      error: (error) => {
        console.error('Fel vid hämtning av recept:', error);
      }
    });
  }
}
