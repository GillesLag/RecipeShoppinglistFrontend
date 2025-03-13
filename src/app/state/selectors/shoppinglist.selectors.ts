import { createFeature, createFeatureSelector, createSelector, State } from "@ngrx/store";
import { AppState, ShoppinglistState } from "../appState";

export const selectShoppinglistState = createFeatureSelector<ShoppinglistState>('shoppinglistState')

export const selectShoppinglists = createSelector(
    selectShoppinglistState,
    (shoppinglistState) => shoppinglistState.shoppinglists
)