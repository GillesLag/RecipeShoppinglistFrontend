import { RecipeIngredient } from "./RecipeIngredient"
import { ShoppinglistIngredient } from "./ShoppinglistIngredient"

export interface Ingredient {
    id: number | undefined,
    name: string,
    recipeIngredients: RecipeIngredient[],
    shoppinglistIngredients: ShoppinglistIngredient[]
}