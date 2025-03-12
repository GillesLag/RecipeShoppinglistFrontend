import { createReducer, on } from "@ngrx/store";
import { Shoppinglist } from "../models/Shoppinglist";
import { ShoppinglistActions } from "./shoppinglist.actions";
import { ShoppinglistState } from "./appState";

export const intitialState: ShoppinglistState = {
    shoppinglists: [],
    error: null
}

export const shoppinglistReducer = createReducer(
    intitialState,
    on(ShoppinglistActions.loadShoppinglists, (_state) => _state),
    on(ShoppinglistActions.loadShoppinglistsSuccess, (_state, { shoppinglists }) => ({
        ..._state,
        shoppinglists,
        error: null
        
    })),
    on(ShoppinglistActions.loadShoppinglistsFailure, (_state, { error }) => ({
        ..._state,
        error
    }))
)
