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

  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private apiKey = 'e29ca641a7814ec58e9c4d1ebf0d7dfd';  

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadEggRecipes();
  }

  loadEggRecipes(): void {
    const params = {
      query: 'egg',  
      apiKey: this.apiKey,
      number: '5'
    };

    this.httpClient
    .get<any>(this.apiUrl, { params })
    .subscribe({
      next: (response) => {
        console.log('API response:', response);
        this.eggRecipes = response.results || [];
        console.log(this.eggRecipes);
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      },
      complete: () => {
        console.log('API call completed');
      }
    });
  }
}
