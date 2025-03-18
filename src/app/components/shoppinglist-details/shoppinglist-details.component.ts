import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Shoppinglist } from '../../models/Shoppinglist';
import { Measurement } from '../../Enums/Measurement';
import { AppState } from '../../state/appState';
import { Store } from '@ngrx/store';
import { ShoppinglistActions } from '../../state/actions/shoppinglist.actions';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { ShoppinglistIngredientService } from '../../services/shoppinglist-ingredient.service';
import { ShoppinglistIngredient } from '../../models/ShoppinglistIngredient';
import { UpdateShoppinglistIngredientDto } from '../../models/dtos/UpdateShoppinglistIngredientDto';
import { FormsModule } from '@angular/forms';

declare var bootstrap: any;

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule, FormsModule],
    templateUrl: './shoppinglist-details.component.html',
})

export class shoppinglistDetailsComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)
    shoppinglistIngredientService = inject(ShoppinglistIngredientService)

    shoppinglist : Shoppinglist | null = null
    measurementList: string[] = Object.keys(Measurement).filter(key => isNaN(Number(key)))

    deleteModal: any;

    constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {

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

    deleteShoppinglist(): void {
        this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
        this.deleteModal.show();
    }

    confirmDeleteShoppinglist(): void {
        this.store.dispatch(ShoppinglistActions.deleteShoppinglist({id: this.shoppinglist!.id}))
        this.deleteModal.hide();

        this.router.navigateByUrl('/');

    }

    updateIngredient(id: number, ingredientDto: UpdateShoppinglistIngredientDto): void {
        this.shoppinglistIngredientService.updateIngredient(id, ingredientDto).subscribe();
    }
}
