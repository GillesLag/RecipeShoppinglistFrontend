import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/Ingredient';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IngredientService {
    private httpClient: HttpClient;
    private baseUrl: string = 'http://localhost:5122/Ingredient'

    constructor(http: HttpClient) {
        this.httpClient = http;
    }

    getAll(): Observable<Ingredient[]> {
        return this.httpClient.get<Ingredient[]>(`${this.baseUrl}/GetAll`);
    }

    createIngredient(name: string): Observable<Ingredient> {
        return this.httpClient.post<Ingredient>(`${this.baseUrl}/Create`, {name});
    }
}
