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

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=egg';
  private apiKey = 'e29ca641a7814ec58e9c4d1ebf0d7dfd';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    // Hämta recepten från RecipeService
    this.recipeService.getWeeklyRecipes().subscribe({
      next: (data) => {
        console.log('API-svar:', data);

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
}

