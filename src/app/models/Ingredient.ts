import { RecipeIngredient } from "./RecipeIngredient"
import { ShoppinglistIngredient } from "./ShoppinglistIngredient"

export interface Ingredient {
    Id: Number,
    Name: string,
    RecipeIngredients: RecipeIngredient[],
    ShoppinglistIngredients: ShoppinglistIngredient[]
}