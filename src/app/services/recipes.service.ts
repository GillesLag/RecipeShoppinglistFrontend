import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private httpClient: HttpClient;
  private baseUrl: string = 'http://localhost:5122/Recipe'

  constructor(http: HttpClient) { 
    this.httpClient = http;
  }

  getAllRecipes(): Observable<Recipe[]>{
    return this.httpClient.get<Recipe[]>(`${this.baseUrl}/GetAll`);
  }
}
