import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EggTipsService {
  private apiUrl = 'https://grupp-7-api-egg-tips.onrender.com/tips'; // API:ets URL

  constructor(private http: HttpClient) {}

  // Hämta alla äggtips
  getEggTips(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
