import { CreateRecipeIngredientDto } from "./CreateRecipeIngredientDto";

export interface CreateRecipeDto {
    cookingInstructions: string[],
    name: string,
    servings: number,
    recipeIngredients: CreateRecipeIngredientDto[]
}