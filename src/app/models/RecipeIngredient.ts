import { Recipe } from "./Recipe"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface RecipeIngredient {
    id: Number,
    recipeId: Number,
    ingredientId: Number,
    quantity: Number,
    measurement: Measurement,
    recipe: Recipe | undefined
    ingredient: Ingredient | undefined
}