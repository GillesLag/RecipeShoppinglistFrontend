import { RecipeIngredient } from "./RecipeIngredient"
import { ShoppinglistIngredient } from "./ShoppinglistIngredient"

export interface Ingredient {
    id: number,
    name: string,
    recipeIngredients: RecipeIngredient[],
    shoppinglistIngredients: ShoppinglistIngredient[]
}