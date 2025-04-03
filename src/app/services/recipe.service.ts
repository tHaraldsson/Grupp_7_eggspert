import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private apiDetailsUrl = 'https://api.spoonacular.com/recipes';
  private apiKey = 'e29ca641a7814ec58e9c4d1ebf0d7dfd';  // Din API-nyckel

  constructor(private http: HttpClient) {}

  // Hämta 3 recept som innehåller ägg en gång i veckan
  getWeeklyRecipes(): Observable<any[]> {
    return timer(0, 604800000).pipe( // Timer som körs var 7:e dag (604800000 ms)
      switchMap(() => {
        const params = new HttpParams()
          .set('apiKey', this.apiKey)
          .set('number', '3') // Hämta 3 recept
          .set('includeIngredients', 'egg'); // Recept som innehåller ägg

        return this.http.get<any>(this.apiUrl, { params }).pipe(
          switchMap(response => {
            const recipeIds = response.results.map((recipe: any) => recipe.id);
            return this.getMultipleRecipeDetails(recipeIds);  // Hämta detaljer för varje recept
          })
        );
      })
    );
  }

  // Hämta detaljerad information om flera recept
  private getMultipleRecipeDetails(recipeIds: number[]): Observable<any[]> {
    const requests = recipeIds.map(id => this.getRecipeDetails(id));
    return forkJoin(requests);  // Vänta på alla anrop
  }

  // Hämta detaljer för ett enskilt recept
  getRecipeDetails(recipeId: number): Observable<any> {
    const url = `${this.apiDetailsUrl}/${recipeId}/information`;
    const params = new HttpParams().set('apiKey', this.apiKey);
    return this.http.get<any>(url, { params });
  }
}
