import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shoppinglist } from '../../models/Shoppinglist';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { Measurement } from '../../Enums/Measurement';
import { AppState } from '../../state/appState';
import { Store } from '@ngrx/store';
import { ShoppinglistActions } from '../../state/shoppinglist.actions';

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule],
    templateUrl: './shoppinglist-details.component.html',
})
export class shoppinglistDetailsComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)

    id: string | null = null;
    shoppinglist: Shoppinglist | undefined;
    measurementList: string[] = Object.keys(Measurement).filter(key => isNaN(Number(key)))

    constructor(private route: ActivatedRoute, private store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.shoppinglistService.getShoppinglistById(parseInt(this.id!)).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist;
            })
        });
    }

    removeIngredient(ingredientId: number): void {
        if (this.shoppinglist) {
            this.shoppinglist.shoppinglistIngredients = this.shoppinglist.shoppinglistIngredients.filter(ingredient => ingredient.id !== ingredientId);
            this.shoppinglistService.updateShoppinglist(this.shoppinglist.id, this.shoppinglist).subscribe({
                next: (shoppinglist) => {
                    this.shoppinglist = shoppinglist;
                    this.store.dispatch(ShoppinglistActions.updateShoppinglist({ shoppinglist: shoppinglist }))
                }
            })
        }
    }
}
