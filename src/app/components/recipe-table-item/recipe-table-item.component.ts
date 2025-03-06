import { Component, inject, input, OnInit } from '@angular/core';
import { RecipeIngredient } from '../../models/RecipeIngredient';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/Recipe';
import { Shoppinglist } from '../../models/Shoppinglist';
import { ShoppinglistService } from '../../services/shoppinglist.service';
import { Measurement } from '../../Enums/Measurement';

@Component({
  selector: 'app-recipe-table-item',
  imports: [CommonModule],
  templateUrl: './recipe-table-item.component.html',
  styleUrl: './recipe-table-item.component.css'
})
export class RecipeTableItemComponent implements OnInit{
    shoppinglistService = inject(ShoppinglistService)

    measurementList: string[] = Object.keys(Measurement).filter(x => isNaN(Number(x)))

    shoppinglists: Shoppinglist[] = [];
    recipe = input.required<Recipe>();
    recipeIngredients = input.required<RecipeIngredient[]>();

    ngOnInit(): void {
        this.shoppinglistService.getAllShoppinglists().subscribe
    }
}
