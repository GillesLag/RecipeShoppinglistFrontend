import { Shoppinglist } from "./Shoppinglist"
import { Ingredient } from "./Ingredient"
import { Measurement } from "../Enums/Measurement"

export interface ShoppinglistIngredient {
    Id: Number,
    ShoppinglistId: Number,
    IngredientId: Number,
    Quantity: Number,
    Measurement: Measurement,
    Shoppinglist: Shoppinglist,
    Ingredient: Ingredient
}