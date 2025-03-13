import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shoppinglist } from '../../models/Shoppinglist';
import { Measurement } from '../../Enums/Measurement';
import { AppState } from '../../state/appState';
import { Store } from '@ngrx/store';
import { ShoppinglistActions } from '../../state/actions/shoppinglist.actions';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { ShoppinglistService } from '../../services/shoppinglist.service';

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule],
    templateUrl: './shoppinglist-details.component.html',
})
export class shoppinglistDetailsComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)

    shoppinglist : Shoppinglist | null = null
    measurementList: string[] = Object.keys(Measurement).filter(key => isNaN(Number(key)))

    constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.shoppinglistService.getShoppinglistById(Number(id)).subscribe(shoppinglist => {
                    this.shoppinglist = shoppinglist
                })
            }
        });
    }

    removeIngredient(ingredientId: number): void {
        if(this.shoppinglist){
            const shoppinglistIngredients = this.shoppinglist.shoppinglistIngredients.filter(ingredient => ingredient.id !== ingredientId)
            const updatedShoppinglist = {
                ...this.shoppinglist,
                shoppinglistIngredients
            }
    
            this.store.dispatch(ShoppinglistActions.updateShoppinglist({ updatedShoppinglist: updatedShoppinglist }))
    
            this.shoppinglist = updatedShoppinglist
        }
    }
}
