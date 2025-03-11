import { Component, inject } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { Shoppinglist } from '../../models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../services/recipes.service';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { RouterLink } from '@angular/router';
import { RecipeTableItemComponent } from '../recipe-table-item/recipe-table-item.component';
import { UpdateShoppinglistDto } from '../../models/dtos/UpdateShoppinglistDto';
import { UpdateShoppinglistIngredientDto } from '../../models/dtos/UpdateShoppinglistIngredientDto';
import { RecipeTableDropdownMenuComponent } from "../recipe-table-dropdown-menu/recipe-table-dropdown-menu.component";
import { FormControl, FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppinglistActions } from '../../state/shoppinglist.actions';

@Component({
    selector: 'recipe-table',
    imports: [CommonModule, RouterLink, RecipeTableItemComponent, RecipeTableDropdownMenuComponent, FormsModule],
    templateUrl: './recipe-table.component.html',
})
export class RecipeTableComponent {
    recipeService = inject(RecipesService)
    shoppinglistService = inject(ShoppinglistService)

    shoppinglistName: string = '';

    recipes: Recipe[] = [];
    shoppinglists!: Observable<Shoppinglist[]>;
    alerts: { id: number, message: string, type: string }[] = []
    nextId: number = 0;

    constructor(private store: Store<{shoppinglists: Shoppinglist[]}>) {
        
    }

    ngOnInit(): void {
        this.recipeService.getAllRecipes().subscribe(recipes => {
            this.recipes = recipes;
        });

        this.shoppinglists = this.store.select(state => state.shoppinglists)
    }

    addToShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): void {
        const shoppinglistDto: UpdateShoppinglistDto = structuredClone(shoppinglist);
        const updatedShoppinglist = this.addIngredientsToShoppinglist(shoppinglistDto, recipe);

        this.shoppinglistService.updateShoppinglist(shoppinglist.id, updatedShoppinglist).subscribe({
            next: () => {
                this.shoppinglistService.getAllShoppinglists().subscribe(shoppinglists => {
                    this.store.dispatch(ShoppinglistActions.setShoppinglists({ shoppinglists: shoppinglists }))
                })

                const newAlert = { id: this.nextId++, message: `The shoppinglist: ${updatedShoppinglist.name} is successfully updated!`, type: 'success' };
                this.showAlert(newAlert);
            },
            error: (err) => {
                const newAlert = { id: this.nextId++, message: `There was an error when updating the shoppinglist: ${updatedShoppinglist.name}`, type: 'danger' };
                this.showAlert(newAlert)
            }
        });
    }

    private addIngredientsToShoppinglist(shoppinglistDto: UpdateShoppinglistDto, recipe: Recipe): UpdateShoppinglistDto {
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
                    ingredientId: Number(recipeIngredient.ingredientId),
                    isChecked: false,
                    quantity: recipeIngredient.quantity,
                    measurement: recipeIngredient.measurement,
                };

                shoppinglistDto.shoppinglistIngredients.push(newItem);
            }
        }

        return shoppinglistDto
    }

    private showAlert(alert: { id: number, message: string, type: string }): void {
        this.alerts.push(alert);

        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x.id !== alert.id);
        }, 5000);
    }

    removeAlert(id: number): void {
        this.alerts = this.alerts.filter(alert => alert.id !== id)
    }

    deleteRecipe(id: number): void {
        this.recipeService.deleteRecipe(id).subscribe();
        this.recipes = this.recipes.filter(x => x.id !== id);
    }

    removeFromShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): void {
        const shoppinglistDto: UpdateShoppinglistDto = structuredClone(shoppinglist);
        const updatedShoppinglist = this.removeIngredientsFromShoppinglist(shoppinglistDto, recipe);

        this.shoppinglistService.updateShoppinglist(shoppinglist.id, updatedShoppinglist).subscribe({
            next: () => {
                this.shoppinglistService.getAllShoppinglists().subscribe(shoppinglists => {
                    this.store.dispatch(ShoppinglistActions.setShoppinglists({ shoppinglists: shoppinglists }))
                })

                const newAlert = { id: this.nextId++, message: `The shoppinglist: ${updatedShoppinglist.name} is successfully updated!`, type: 'success' };
                this.showAlert(newAlert);
            },
            error: (err) => {
                const newAlert = { id: this.nextId++, message: `There was an error when updating the shoppinglist: ${updatedShoppinglist.name}`, type: 'danger' };
                this.showAlert(newAlert)
            }
        })
    }

    private removeIngredientsFromShoppinglist(shoppinglistDto: UpdateShoppinglistDto, recipe: Recipe): UpdateShoppinglistDto {
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

    createShoppinglist(): void {
        if (!this.shoppinglistName) {
            return;
        }

        this.shoppinglistService.createShoppinglist({ name: this.shoppinglistName }).subscribe({
            next: (shoppinglist) => {
                this.showAlert({ id: this.nextId++, message: `New Shoppinglist ${this.shoppinglistName} successfully created`, type: 'success' })
                this.store.dispatch(ShoppinglistActions.addShoppinglist({ shoppinglist: shoppinglist }));
            },
            error: () => {
                this.showAlert({ id: this.nextId++, message: `Failed To Create Shoppinglist: ${this.shoppinglistName}`, type: 'danger' })
            },
            complete: () => {
                this.shoppinglistName = '';
            }
        })
    }
}