import { Shoppinglist } from "../models/Shoppinglist";

export interface AppState{
    shoppinglistState: ShoppinglistState
}

export interface ShoppinglistState{
    shoppinglists: ReadonlyArray<Shoppinglist>,
    error: string | null,
}
