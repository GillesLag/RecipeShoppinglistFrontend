import { Measurement } from "../../Enums/Measurement"
import { CreateIngredientDto } from "./CreateIngredientDto"

export interface CreateRecipeIngredientDto {
    ingredientId: number,
    quantity: number,
    measurement: Measurement,
    ingredient: CreateIngredientDto | undefined
}