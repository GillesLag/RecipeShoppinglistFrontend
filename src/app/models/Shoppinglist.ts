import { ShoppinglistIngredient } from "./ShoppinglistIngredient"
import { ShoppinglistRecipe } from "./ShoppinglistRecipe"

export interface Shoppinglist {
    id: number,
    name: string,
    shoppinglistIngredients: ShoppinglistIngredient[]
    shoppinglistRecipes: ShoppinglistRecipe[]
}