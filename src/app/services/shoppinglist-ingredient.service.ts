import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateShoppinglistIngredientDto } from '../models/dtos/UpdateShoppinglistIngredientDto';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppinglistIngredientService {
    private baseUrl: string = 'http://localhost:5122/ShoppinglistIngredient/Update';

    constructor(private http: HttpClient){}

    updateIngredient(id: number, ShoppinglistIngredientDto: UpdateShoppinglistIngredientDto): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${id}`, ShoppinglistIngredientDto);
    }
}
