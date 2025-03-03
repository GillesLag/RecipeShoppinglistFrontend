import { ShoppinglistIngredient } from "./ShoppinglistIngredient"

export interface Shoppinglist {
    id: number,
    name: string,
    shoppinglistIngredients: ShoppinglistIngredient[]
}