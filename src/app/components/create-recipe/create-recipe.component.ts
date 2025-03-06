import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Measurement } from '../../Enums/Measurement';
import { FormsModule } from '@angular/forms'
import { RecipesService } from '../../services/recipes.service';
import { Ingredient } from '../../models/Ingredient';
import { CreateRecipeDto } from '../../models/dtos/CreateRecipeDto';
import { IngredientService } from '../../services/ingredient.service';
import { CreateRecipeIngredientDto } from '../../models/dtos/CreateRecipeIngredientDto';

@Component({
    selector: 'app-create-recipe',
    imports: [CommonModule, FormsModule],
    templateUrl: './create-recipe.component.html',
    styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent implements OnInit {
    ingredientService = inject(IngredientService)
    recipeService = inject(RecipesService)
    measurementList: string[] = Object.keys(Measurement).filter(x => isNaN(Number(x)))
    allIngredients: Ingredient[] = []

    recipeName: string = ''
    servings: number = 0

    nextIngredientId: number = 0
    ingredients: { id: number, name: string, quantity: number, measurement: Measurement }[] = []

    nextInstructionId: number = 0
    cookingInstructions: { id: number, instruction: string }[] = []
    instruction: string = ''

    ngOnInit(): void {
        this.ingredientService.getAll().subscribe(ingredients => {
            this.allIngredients = ingredients;
        })
    }

    addIngredient(): void {
        this.ingredients.push({
            id: this.nextIngredientId++,
            name: '',
            quantity: 0,
            measurement: Measurement.Gram
        })
    }

    deleteIngredient(id: number): void {
        this.ingredients = this.ingredients.filter(x => x.id !== id)
    }

    addInstruction(): void {
        this.cookingInstructions.push({
            id: this.nextInstructionId++,
            instruction: this.instruction
        })

        this.instruction = '';
    }

    deleteInstruction(id: number): void {
        this.cookingInstructions = this.cookingInstructions.filter(x => x.id !== id)
    }

    createRecipe(): void {
        const recipe: CreateRecipeDto = {
            name: this.recipeName,
            servings: this.servings,
            cookingInstructions: this.createInstructions(),
            recipeIngredients: this.createRecipeIngredients(),
        };

        console.log(JSON.stringify(recipe));
        console.log(recipe);


        this.recipeService.createRecipe(recipe).subscribe({
            next: () => { alert('recipe added') },
            error: () => { alert('recipe added failed') }
        });
    }

    createInstructions(): string[] {
        const instructions: string[] = []

        this.cookingInstructions.forEach(element => {
            instructions.push(element.instruction)
        });

        return instructions
    }

    createRecipeIngredients(): CreateRecipeIngredientDto[] {
        const ingredients: CreateRecipeIngredientDto[] = []

        this.ingredients.forEach(x => {
            const tempIngredient = this.allIngredients.find(y => y.name === x.name)
            const item: CreateRecipeIngredientDto = {
                ingredientId: 0,
                quantity: x.quantity,
                measurement: x.measurement,
                ingredient: undefined,
            };

            if (!tempIngredient) {
                item.ingredient = { name: x.name };
            } else {
                item.ingredient = { name: tempIngredient.name };
                item.ingredientId = Number(tempIngredient.id)
            }

            ingredients.push(item);
        })

        return ingredients
    }
}
