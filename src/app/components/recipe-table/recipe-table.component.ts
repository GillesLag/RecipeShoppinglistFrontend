import { Component, inject, Input } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { Shoppinglist } from '../../models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../services/recipes.service';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { RouterLink } from '@angular/router';
import { ShoppinglistIngredient } from '../../models/ShoppinglistIngredient';

@Component({
    selector: 'recipe-table',
    imports: [CommonModule, RouterLink],
    templateUrl: './recipe-table.component.html',
    styleUrl: './recipe-table.component.css'
})
export class RecipeTableComponent {
    recipeService = inject(RecipesService)
    shoppinglistService = inject(ShoppinglistService)

    recipes: Recipe[] = [];
    shoppinglists: Shoppinglist[] = [];

    ngOnInit(): void {
        this.recipeService.getAllRecipes().subscribe(recipes => {
            this.recipes = recipes;
        });

        this.shoppinglistService.getAllShoppinglists().subscribe(shoppinglists => {
            this.shoppinglists = shoppinglists
        })
    }

    updateShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): void {
        for (let index = 0; index < recipe.recipeIngredients.length; index++) {
            const element = recipe.recipeIngredients[index];
            const list = shoppinglist.shoppinglistIngredients.find(x => x.ingredientId == element.ingredientId)

            if (list) {
                list.quantity += element.quantity;
            } else {
                let newItem: ShoppinglistIngredient =
                {
                    id: null,
                    shoppinglist: null,
                    ingredient: null,
                    shoppinglistId: shoppinglist.id,
                    ingredientId: element.ingredientId,
                    quantity: element.quantity,
                    measurement: element.measurement,
                };

                shoppinglist.shoppinglistIngredients.push(newItem);
            }
        }

        this.shoppinglistService.addRecipeToShoppinglist(shoppinglist).subscribe({
            next: (response) => {
                console.log(response)
                alert('Shoppinglist updateted');
            },
            error: (err) => {
                console.log(err)
                alert('Failed to update shoppinglist');
            }
        });
    }
}