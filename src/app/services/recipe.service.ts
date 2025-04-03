import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timer, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php';  // TheMealDB API URL

  constructor(private http: HttpClient) {}

  // Hämta recept som innehåller "omelet"
  getWeeklyRecipes(): Observable<any> {
    return timer(0, 604800000).pipe(
      switchMap(() => {
        const params = new HttpParams().set('s', 'omelet');  // Filtrera på omelet

        return this.http.get<any>(this.apiUrl, { params });
      })
    );
  }

  // Hämta detaljer om ett specifikt recept
  getRecipeDetails(recipeId: number): Observable<any> {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    return this.http.get<any>(url);
  }
}
