import { Recipe } from "./Recipe"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface RecipeIngredient {
    id: number | undefined,
    recipeId: number | undefined,
    ingredientId: number | undefined,
    quantity: number,
    measurement: Measurement,
    recipe: Recipe | undefined
    ingredient: Ingredient | undefined
}