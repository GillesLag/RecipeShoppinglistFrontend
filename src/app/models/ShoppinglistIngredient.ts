import { Shoppinglist } from "./Shoppinglist"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface ShoppinglistIngredient {
    id: number | null,
    shoppinglistId: number,
    ingredientId: number,
    quantity: number,
    measurement: Measurement,
    shoppinglist: Shoppinglist | null,
    ingredient: Ingredient | null
}