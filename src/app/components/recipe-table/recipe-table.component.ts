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
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ShoppinglistActions } from '../../state/actions/shoppinglist.actions';
import { AppState } from '../../state/appState';
import { selectShoppinglists } from '../../state/selectors/shoppinglist.selectors';
import { CreateShoppinglistComponent } from "../create-shoppinglist/create-shoppinglist.component";
import { DeleteModalComponent } from "../delete-modal/delete-modal.component";

declare var bootstrap: any;

@Component({
    selector: 'recipe-table',
    imports: [CommonModule, RouterLink, RecipeTableItemComponent, RecipeTableDropdownMenuComponent, FormsModule, CreateShoppinglistComponent, DeleteModalComponent],
    templateUrl: './recipe-table.component.html',
})

export class RecipeTableComponent {
    recipeService = inject(RecipesService)
    shoppinglistService = inject(ShoppinglistService)

    recipeToDelete: Recipe | null = null;
    shoppinglistName: string = '';
    myModal: any;

    recipes: Recipe[] = [];
    shoppinglists$!: Observable<ReadonlyArray<Shoppinglist>>;

    constructor(private store: Store<AppState>) {
        this.shoppinglists$ = this.store.select(selectShoppinglists)
    }

    ngOnInit(): void {
        this.recipeService.getAllRecipes().subscribe(recipes => {
            this.recipes = recipes;
        });
    }

    addToShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): void {
        const updatedShoppinglist = this.shoppinglistService.addIngredientsToShoppinglist(shoppinglist, recipe);

        this.store.dispatch(ShoppinglistActions.updateShoppinglist({ updatedShoppinglist: updatedShoppinglist }))
    }

    deleteRecipe(recipe: Recipe): void {
        this.recipeToDelete = recipe;
    }

    confirmDelete(){
        this.recipeService.deleteRecipe(this.recipeToDelete!.id);
    }

    removeFromShoppinglist(shoppinglist: Shoppinglist, recipe: Recipe): void {
        const shoppinglistDto: UpdateShoppinglistDto = structuredClone(shoppinglist);
        const updatedShoppinglist = this.shoppinglistService.removeIngredientsFromShoppinglist(shoppinglistDto, recipe)
        console.log(updatedShoppinglist)

        this.store.dispatch(ShoppinglistActions.updateShoppinglist({ updatedShoppinglist: updatedShoppinglist }))
    }

    createShoppinglist(): void {
        if (!this.shoppinglistName) {
            return;
        }

        this.store.dispatch(ShoppinglistActions.createShoppinglist({newShoppinglist: {name: this.shoppinglistName}}))

        this.shoppinglistName = '';
    }
}