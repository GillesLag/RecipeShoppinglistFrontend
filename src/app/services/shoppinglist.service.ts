import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shoppinglist } from '../models/Shoppinglist';
import { UpdateShoppinglistDto } from '../models/dtos/UpdateShoppinglistDto';
import { CreateShoppinglistDto } from '../models/dtos/CreateShoppinglistDto';

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

    updateShoppinglist(id: number, shoppinglist: UpdateShoppinglistDto): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/UpdateShoppinglist/${id}`, shoppinglist)
    }

    createShoppinglist(shoppinglist: CreateShoppinglistDto): Observable<Shoppinglist>{
        return this.httpClient.post<Shoppinglist>(`${this.baseUrl}/Add`, shoppinglist);
    }
}
