import { createReducer, on } from "@ngrx/store";
import { Shoppinglist } from "../models/Shoppinglist";
import { ShoppinglistActions, ShoppinglistApiActions } from "./shoppinglist.actions";

export const intitialState: Shoppinglist[] = []

export const shoppinglistReducer = createReducer(
    intitialState,
    on(ShoppinglistApiActions.retrieveShoppinglists, (_state, { shoppinglists }) => shoppinglists),
    on(ShoppinglistActions.addShoppinglist, (_state, { shoppinglist }) => [..._state, shoppinglist]),
    on(ShoppinglistActions.removeShoppinglist, (_state, { shoppinglistId }) => _state = _state.filter(x => x.id !== shoppinglistId)),
    on(ShoppinglistActions.setShoppinglists, (_state, { shoppinglists }) => _state = shoppinglists)
)