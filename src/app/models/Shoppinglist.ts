import { ShoppinglistIngredient } from "./ShoppinglistIngredient"

export interface Shoppinglist {
    id: Number,
    name: string,
    shoppinglistIngredients: ShoppinglistIngredient[]
}