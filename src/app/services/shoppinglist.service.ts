import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shoppinglist } from '../models/Shoppinglist';

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

    updateShoppinglist(id: number, shoppinglist: Shoppinglist): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/AddRecipeToShoppinglist/${id}`, shoppinglist)
    }

}
