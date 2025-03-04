import { RecipeIngredient } from "./RecipeIngredient"
import { ShoppinglistRecipe } from "./ShoppinglistRecipe"

export interface Recipe {
    id: number,
    name: string,
    servings: number,
    cookingInstructions: string,
    recipeIngredients: RecipeIngredient[],
    shoppinglistRecipes: ShoppinglistRecipe[]
}