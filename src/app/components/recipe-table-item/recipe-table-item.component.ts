import { Component, input, OnInit } from '@angular/core';
import { RecipeIngredient } from '../../models/RecipeIngredient';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/Recipe';
import { Measurement } from '../../Enums/Measurement';
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-recipe-table-item',
    imports: [CommonModule, FormsModule],
    templateUrl: './recipe-table-item.component.html',
    styleUrl: './recipe-table-item.component.css'
})
export class RecipeTableItemComponent implements OnInit {
    measurementList: string[] = Object.keys(Measurement).filter(x => isNaN(Number(x)))

    recipe = input.required<Recipe>();
    recipeIngredients = input.required<RecipeIngredient[]>();

    ngOnInit(): void {

    }

    updateQuantities(event: Event): void {
        const inputElement = event.target as HTMLInputElement
        const newServings = inputElement.valueAsNumber

        this.recipe().recipeIngredients.forEach(ri => {
            ri.quantity = ri.quantity / this.recipe().servings * newServings;
        })

        this.recipe().servings = newServings;
    }
}
