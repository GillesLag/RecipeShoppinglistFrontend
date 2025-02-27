import { Recipe } from "./Recipe"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface RecipeIngredient {
    Id: Number,
    RecipeId: Number,
    IngredientId: Number,
    Quantity: Number,
    Measurement: Measurement,
    Recipe: Recipe | undefined
    Ingredient: Ingredient | undefined
}