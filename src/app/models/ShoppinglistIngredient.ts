import { Shoppinglist } from "./Shoppinglist"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface ShoppinglistIngredient {
    id: number | undefined,
    shoppinglistId: number,
    ingredientId: number,
    quantity: number,
    measurement: Measurement,
    isChecked: boolean,
    shoppinglist: Shoppinglist | null,
    ingredient: Ingredient | null
}