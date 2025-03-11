import { createReducer, on } from "@ngrx/store";
import { Shoppinglist } from "../models/Shoppinglist";
import { ShoppinglistActions } from "./shoppinglist.actions";

export const intitialState: Shoppinglist[] = []

export const shoppinglistReducer = createReducer(
    intitialState,
    on(ShoppinglistActions.addShoppinglist, (_state, { shoppinglist }) => [..._state, shoppinglist]),
    on(ShoppinglistActions.removeShoppinglist, (_state, { shoppinglistId }) => _state = _state.filter(x => x.id !== shoppinglistId)),
    on(ShoppinglistActions.setShoppinglists, (_state, { shoppinglists }) => _state = shoppinglists)
)
