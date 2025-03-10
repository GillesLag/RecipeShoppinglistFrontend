import { createReducer, on } from "@ngrx/store";
import { Shoppinglist } from "../models/Shoppinglist";
import { ShoppinglistActions, ShoppinglistApiActions } from "./shoppinglist.actions";
import { ShoppinglistIngredient } from "../models/ShoppinglistIngredient";
import { Recipe } from "../models/Recipe";
import { UpdateShoppinglistIngredientDto } from "../models/dtos/UpdateShoppinglistIngredientDto";

export const intitialState: Shoppinglist[] = []

export const shoppinglistReducer = createReducer(
    intitialState,
    on(ShoppinglistApiActions.retrieveShoppinglists, (_state, { shoppinglists }) => shoppinglists),
    on(ShoppinglistActions.addShoppinglist, (_state, { shoppinglist }) => [..._state, shoppinglist]),
    on(ShoppinglistActions.removeShoppinglist, (_state, { shoppinglistId }) => _state = _state.filter(x => x.id !== shoppinglistId)),
)
