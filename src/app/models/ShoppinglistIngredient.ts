import { Shoppinglist } from "./Shoppinglist"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface ShoppinglistIngredient {
    id: Number,
    shoppinglistId: Number,
    ingredientId: Number,
    quantity: Number,
    measurement: Measurement,
    shoppinglist: Shoppinglist,
    ingredient: Ingredient
}