import { Component, inject, Input } from '@angular/core';
import { Recipe } from '../../models/Recipe';
import { Shoppinglist } from '../../models/Shoppinglist';
import { CommonModule } from '@angular/common';
import { RecipesService } from '../../services/recipes.service';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { RouterLink } from '@angular/router';

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
      this.recipeService.GetAllRecipes().subscribe(recipes => {
        this.recipes = recipes;
      });

      this.shoppinglistService.GetAllShoppinglists().subscribe(shoppinglists => {
        this.shoppinglists = shoppinglists
      })

    }
}