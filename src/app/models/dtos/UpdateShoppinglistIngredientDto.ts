import { Measurement } from "../../Enums/Measurement"

export interface UpdateShoppinglistIngredientDto {
    id: number | undefined,
    shoppinglistId: number,
    ingredientId: number,
    quantity: number,
    measurement: Measurement,
    isChecked: boolean,
}