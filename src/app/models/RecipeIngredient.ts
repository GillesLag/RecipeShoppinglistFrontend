import { Recipe } from "./Recipe"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface RecipeIngredient {
    id: number,
    recipeId: number,
    ingredientId: number,
    quantity: number,
    measurement: Measurement,
    recipe: Recipe | undefined
    ingredient: Ingredient | undefined
}