import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../models/Recipe';
import { Observable } from 'rxjs';
import { CreateRecipeDto } from '../models/dtos/createRecipeDto';

@Injectable({
    providedIn: 'root'
})
export class RecipesService {
    private httpClient: HttpClient;
    private baseUrl: string = 'http://localhost:5122/Recipe'

    constructor(http: HttpClient) {
        this.httpClient = http;
    }

    getAllRecipes(): Observable<Recipe[]> {
        return this.httpClient.get<Recipe[]>(`${this.baseUrl}/GetAll`);
    }

    getById(id: number): Observable<Recipe> {
        return this.httpClient.get<Recipe>(`${this.baseUrl}/GetById/${id}`)
    }

    createRecipe(recipe: CreateRecipeDto): Observable<void> {
        return this.httpClient.post<void>(`${this.baseUrl}/CreateRecipe`, recipe);
    }
}
