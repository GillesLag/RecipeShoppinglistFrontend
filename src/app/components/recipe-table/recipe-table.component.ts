import { Component, inject } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { Shoppinglist } from '../../models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../services/recipes.service';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { ShoppinglistIngredient } from '../../models/ShoppinglistIngredient';
import { RouterLink } from '@angular/router';
import { RecipeTableItemComponent } from '../recipe-table-item/recipe-table-item.component';

@Component({
    selector: 'recipe-table',
    imports: [CommonModule, RouterLink, RecipeTableItemComponent],
    templateUrl: './recipe-table.component.html',
    styleUrl: './recipe-table.component.css'
})
export class RecipeTableComponent {
    recipeService = inject(RecipesService)
    shoppinglistService = inject(ShoppinglistService)

    recipes: Recipe[] = [];
    shoppinglists: Shoppinglist[] = [];
    alerts: { id: number, message: string, type: string }[] = []
    nextId: number = 0;

    ngOnInit(): void {
        this.recipeService.getAllRecipes().subscribe(recipes => {
            this.recipes = recipes;
        });

        this.shoppinglistService.getAllShoppinglists().subscribe(shoppinglists => {
            this.shoppinglists = shoppinglists
        })
    }

    updateShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): void {
        let updatedShopinglist = this.addIngredientsToShoppinglist(shoppinglist, recipe);

        this.shoppinglistService.updateShoppinglist(shoppinglist.id, updatedShopinglist).subscribe({
            next: () => {
                const newAlert = { id: this.nextId++, message: `The shoppinglist: ${updatedShopinglist.name} is successfully updated!`, type: 'success' };
                this.showAlert(newAlert);
            },
            error: (err) => {
                const newAlert = { id: this.nextId++, message: `There was an error when updating the shoppinglist: ${updatedShopinglist.name}`, type: 'danger' };
                this.showAlert(newAlert)
            }
        });
    }

    showAlert(alert: { id: number, message: string, type: string }): void {
        this.alerts.push(alert);

        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x.id !== alert.id);
        }, 5000);
    }

    addIngredientsToShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): Shoppinglist {
        for (let index = 0; index < recipe.recipeIngredients.length; index++) {
            const element = recipe.recipeIngredients[index];
            const list = shoppinglist.shoppinglistIngredients.find(x => x.ingredientId === element.ingredientId)

            if (list) {
                list.quantity += element.quantity;
            } else {
                let newItem: ShoppinglistIngredient =
                {
                    id: undefined,
                    shoppinglist: null,
                    ingredient: null,
                    shoppinglistId: shoppinglist.id,
                    ingredientId: Number(element.ingredientId),
                    isChecked: false,
                    quantity: element.quantity,
                    measurement: element.measurement,
                };

                shoppinglist.shoppinglistIngredients.push(newItem);
            }
        }

        return shoppinglist
    }

    removeAlert(id: number): void {
        this.alerts = this.alerts.filter(alert => alert.id !== id)
    }

    deleteRecipe(id: number): void {
        this.recipeService.deleteRecipe(id).subscribe();
        this.recipes = this.recipes.filter(x => x.id !== id);
    }
}