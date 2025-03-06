import { CreateRecipeIngredientDto } from "./CreateRecipeIngredientDto";

export interface CreateRecipeDto {
    name: string,
    servings: number,
    cookingInstructions: string[],
    recipeIngredients: CreateRecipeIngredientDto[]
}