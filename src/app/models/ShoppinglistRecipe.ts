import { Recipe } from "./Recipe"
import { Shoppinglist } from "./Shoppinglist"

export interface ShoppinglistRecipe{
    id: number | undefined,
    shoppinglistId: number,
    recipeId: number,
    shoppinglist: Shoppinglist | undefined,
    recipe: Recipe | undefined
}