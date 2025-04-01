import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timer, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private apiDetailsUrl = 'https://api.spoonacular.com/recipes'; // URL för att hämta detaljer om ett recept
  private apiKey = 'e29ca641a7814ec58e9c4d1ebf0d7dfd';  

  constructor(private http: HttpClient) {}

  // Hämta recept som innehåller ägg
  getWeeklyRecipes(): Observable<any> {
    return timer(0, 604800000).pipe(
      switchMap(() => {
        const params = new HttpParams()
          .set('apiKey', this.apiKey)
          .set('number', '3')
          .set('includeIngredients', 'egg');

        return this.http.get<any>(this.apiUrl, { params });
      })
    );
  }

  // Hämta detaljer om ett specifikt recept
  getRecipeDetails(recipeId: number): Observable<any> {
    const url = `${this.apiDetailsUrl}/${recipeId}/information`;
    const params = new HttpParams().set('apiKey', this.apiKey);
    return this.http.get<any>(url, { params });
  }
}
