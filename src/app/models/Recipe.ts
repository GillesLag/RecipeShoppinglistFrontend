import { RecipeIngredient } from "./RecipeIngredient"

export interface Recipe {
    id: number | undefined,
    name: string,
    servings: number,
    cookingInstructions: string[],
    recipeIngredients: RecipeIngredient[],
}