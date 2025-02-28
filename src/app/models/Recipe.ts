import { RecipeIngredient } from "./RecipeIngredient"

export interface Recipe {
    id: number,
    name: string,
    servings: number,
    cookingInstructions: string,
    recipeIngredients: RecipeIngredient[]
}