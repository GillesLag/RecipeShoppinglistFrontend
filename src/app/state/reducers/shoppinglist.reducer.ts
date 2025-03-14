import { createReducer, on } from "@ngrx/store";
import { ShoppinglistActions } from "../actions/shoppinglist.actions";
import { ShoppinglistState } from "../appState";

export const intitialState: ShoppinglistState = {
    shoppinglists: [],
    error: null
}

export const shoppinglistReducer = createReducer(
    intitialState,
    on(ShoppinglistActions.loadShoppinglistsSuccess, (state, { shoppinglists }) => ({
        ...state,
        shoppinglists,
        error: null
    })),
    on(ShoppinglistActions.loadShoppinglistsFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ShoppinglistActions.updateShoppinglistSuccess, (state, { shoppinglist }) => ({
        ...state,
        shoppinglists: state.shoppinglists.map(x => x.id === shoppinglist.id ? shoppinglist : x),
        error: null
    })),
    on(ShoppinglistActions.updateShoppinglistFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ShoppinglistActions.createShoppinglistSuccess, (state, { shoppinglist }) => ({
        ...state,
        shoppinglists: [...state.shoppinglists, shoppinglist],
        error: null
    })),
    on(ShoppinglistActions.createShopppinglistFailure, (state, { error }) => ({
        ...state,
        error
    })),
    on(ShoppinglistActions.deleteShoppinglistSuccess, (state, { id }) => ({
        ...state,
        shoppinglists: state.shoppinglists.filter(x => x.id !== id),
        error: null
    })),
    on(ShoppinglistActions.deleteShoppinglistFailure, (state, { error }) => ({
        ...state,
        error
    }))
    
)
