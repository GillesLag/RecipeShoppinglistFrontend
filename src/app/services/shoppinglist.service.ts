import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shoppinglist } from '../models/Shoppinglist';
import { UpdateShoppinglistDto } from '../models/dtos/UpdateShoppinglistDto';
import { CreateShoppinglistDto } from '../models/dtos/CreateShoppinglistDto';
import { UpdateShoppinglistIngredientDto } from '../models/dtos/UpdateShoppinglistIngredientDto';
import { Recipe } from '../models/Recipe';

@Injectable({
    providedIn: 'root'
})
export class ShoppinglistService {
    private httpClient: HttpClient;
    private baseUrl: string = 'http://localhost:5122/Shoppinglist'

    constructor(http: HttpClient) {
        this.httpClient = http;
    }

    getAllShoppinglists(): Observable<Shoppinglist[]> {
        return this.httpClient.get<Shoppinglist[]>(`${this.baseUrl}/GetAll`)
    }

    getShoppinglistById(id: number): Observable<Shoppinglist> {
        return this.httpClient.get<Shoppinglist>(`${this.baseUrl}/GetById/${id}`);
    }

    updateShoppinglist(id: number, shoppinglist: UpdateShoppinglistDto): Observable<Shoppinglist> {
        return this.httpClient.put<Shoppinglist>(`${this.baseUrl}/UpdateShoppinglist/${id}`, shoppinglist)
    }

    createShoppinglist(shoppinglist: CreateShoppinglistDto): Observable<Shoppinglist>{
        return this.httpClient.post<Shoppinglist>(`${this.baseUrl}/Add`, shoppinglist);
    }

    addIngredientsToShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): UpdateShoppinglistDto {
        const shoppinglistDto: UpdateShoppinglistDto = structuredClone(shoppinglist)

        for (let index = 0; index < recipe.recipeIngredients.length; index++) {
            const recipeIngredient = recipe.recipeIngredients[index];

            if (!recipeIngredient.isChecked) {
                continue;
            }

            const shoppinglistIngredient = shoppinglistDto.shoppinglistIngredients.find(x => x.ingredientId === recipeIngredient.ingredientId)

            if (shoppinglistIngredient) {
                shoppinglistIngredient.quantity += recipeIngredient.quantity;
            } else {
                let newItem: UpdateShoppinglistIngredientDto =
                {
                    id: undefined,
                    shoppinglistId: shoppinglistDto.id,
                    ingredientId: recipeIngredient.ingredientId,
                    isChecked: false,
                    quantity: recipeIngredient.quantity,
                    measurement: recipeIngredient.measurement,
                };

                shoppinglistDto.shoppinglistIngredients.push(newItem);
            }
        }
        
        return shoppinglistDto
    }

    removeIngredientsFromShoppinglist(shoppinglistDto: UpdateShoppinglistDto, recipe: Recipe): UpdateShoppinglistDto {
        for (let index = 0; index < recipe.recipeIngredients.length; index++) {
            const recipeIngredient = recipe.recipeIngredients[index];
            if (!recipeIngredient.isChecked) {
                continue;
            }

            const shoppinglistIngredient = shoppinglistDto.shoppinglistIngredients.find(x => x.ingredientId === recipeIngredient.ingredientId)

            if (!shoppinglistIngredient) {
                continue;
            }

            shoppinglistIngredient.quantity -= recipeIngredient.quantity;
            if (shoppinglistIngredient.quantity <= 0) {
                shoppinglistDto.shoppinglistIngredients = shoppinglistDto.shoppinglistIngredients.filter(x => x.id !== shoppinglistIngredient.id)
            }

        }

        return shoppinglistDto
    }

    deleteShoppinglist(id: number): Observable<number> {
        return this.httpClient.delete<number>(`${this.baseUrl}/delete/${id}`)
    }
}
