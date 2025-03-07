import { UpdateShoppinglistIngredientDto } from "./UpdateShoppinglistIngredientDto"

export interface UpdateShoppinglistDto {
    id: number,
    name: string,
    shoppinglistIngredients: UpdateShoppinglistIngredientDto[]
}