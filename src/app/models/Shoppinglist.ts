import { ShoppinglistIngredient } from "./ShoppinglistIngredient"

export interface Shoppinglist {
    Id: Number,
    Name: string,
    ShoppinglistIngredients: ShoppinglistIngredient[]
}