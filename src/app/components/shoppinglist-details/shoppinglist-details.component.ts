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
import { UpdateShoppinglistIngredientDto } from '../../models/dtos/UpdateShoppinglistIngredientDto';
import { FormsModule } from '@angular/forms';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { IngredientService } from '../../services/ingredient.service';
import { Ingredient } from '../../models/Ingredient';
import { UpdateShoppinglistDto } from '../../models/dtos/UpdateShoppinglistDto';

@Component({
    selector: 'app-recipe-details',
    imports: [CommonModule, FormsModule, DeleteModalComponent],
    templateUrl: './shoppinglist-details.component.html',
    styleUrl: './shoppinglist-details.component.css'
})

export class shoppinglistDetailsComponent implements OnInit {
    shoppinglistService = inject(ShoppinglistService)
    shoppinglistIngredientService = inject(ShoppinglistIngredientService)
    ingredientService = inject(IngredientService)

    shoppinglist : Shoppinglist | null = null
    measurementList: string[] = Object.keys(Measurement).filter(key => isNaN(Number(key)))
    ingredients: Ingredient[] = []
    filteredIngredients: Ingredient[] = []
    showDropdown: boolean = false;
    isDisabled: boolean = false;

    newIngredientName: string = ''
    newIngredientQuantity: number = 0;
    newIngredientMeasurement: Measurement = Measurement.Gram


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

        this.ingredientService.getAll().subscribe(ingredients => {
            this.ingredients = ingredients
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

    addIngredient(): void {
        const ingredient = this.ingredients.find(x => x.name.toLowerCase() === this.newIngredientName.toLowerCase())
        if (!ingredient) {
            this.ingredientService.createIngredient(this.newIngredientName).subscribe(newIngredient => {
                this.createShoppinglistIngredient(newIngredient);
            })

            return;
        }

        const shoppinglistIngredient = this.shoppinglist?.shoppinglistIngredients.find(x => x.ingredient.name.toLowerCase() === this.newIngredientName.toLowerCase());

        if (!shoppinglistIngredient) {
            this.createShoppinglistIngredient(ingredient!);
            return;
        }

        const updatedShoppinglist: UpdateShoppinglistDto = {
            ...this.shoppinglist!,
            shoppinglistIngredients: this.shoppinglist!.shoppinglistIngredients.map(x => {
                if (x.ingredient.name.toLowerCase() === this.newIngredientName.toLowerCase()){
                    return {
                        ...x,
                        quantity: x.quantity + this.newIngredientQuantity
                    }
                }

                return x
            })
        }

        this.shoppinglistService.updateShoppinglist(this.shoppinglist!.id, updatedShoppinglist).subscribe(shoppinglist => {
            this.shoppinglist = shoppinglist;
        })
    }

    createShoppinglistIngredient(ingredient: Ingredient): void{
        const newShoppinglistIngredient: UpdateShoppinglistIngredientDto = {
            id: undefined,
            shoppinglistId: this.shoppinglist!.id,
            ingredientId: ingredient!.id,
            quantity: this.newIngredientQuantity,
            measurement: this.newIngredientMeasurement,
            isChecked: false
        }

        const updatedShoppinglist: UpdateShoppinglistDto = {
            ...this.shoppinglist!,
            shoppinglistIngredients: [...this.shoppinglist!.shoppinglistIngredients, newShoppinglistIngredient]
        }

        this.shoppinglistService.updateShoppinglist(this.shoppinglist!.id, updatedShoppinglist).subscribe(() => {
            this.shoppinglistService.getShoppinglistById(this.shoppinglist!.id).subscribe(shoppinglist => {
                this.shoppinglist = shoppinglist
            })
        })
    }

    confirmDeleteShoppinglist(): void {
        this.store.dispatch(ShoppinglistActions.deleteShoppinglist({id: this.shoppinglist!.id}))
        this.router.navigateByUrl('/');
    }

    updateIngredient(id: number, ingredientDto: UpdateShoppinglistIngredientDto): void {
        this.shoppinglistIngredientService.updateIngredient(id, ingredientDto).subscribe();
    }

    onInput(value: string): void {
        this.newIngredientName = value;
        this.filteredIngredients = this.ingredients.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
        this.showDropdown = true;

    }

    onSelect(option: string): void {
        this.newIngredientName = option;
        this.showDropdown = false;
    }

    onBlur(): void {
        setTimeout(() => {
            this.showDropdown = false;

            const ingredient = this.shoppinglist?.shoppinglistIngredients.find(x => x.ingredient.name.toLowerCase() === this.newIngredientName.toLowerCase());
            if (ingredient){
                this.newIngredientMeasurement = ingredient.measurement
                this.isDisabled = true;
            } else {
                this.isDisabled = false;
            }


        }, 200);
    }
}
