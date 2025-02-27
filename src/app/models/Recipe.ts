import { RecipeIngredient } from "./RecipeIngredient"

export interface Recipe {
    Id: Number,
    Name: string,
    Servings: Number,
    CookingInstructions: string,
    RecipeIngredients: RecipeIngredient[]
}