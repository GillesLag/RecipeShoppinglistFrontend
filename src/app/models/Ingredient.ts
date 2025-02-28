import { RecipeIngredient } from "./RecipeIngredient"
import { ShoppinglistIngredient } from "./ShoppinglistIngredient"

export interface Ingredient {
    id: Number,
    name: string,
    recipeIngredients: RecipeIngredient[],
    shoppinglistIngredients: ShoppinglistIngredient[]
}