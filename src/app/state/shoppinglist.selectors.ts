import { createFeature, createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState, ShoppinglistState } from "./appState";

export const selectShoppinglistState = createFeatureSelector<AppState>('shoppinglists')

export const selectShoppinglists = createSelector(
    selectShoppinglistState,
    (state) => state.shoppinglistState.shoppinglists
)

export const selectShoppinglistById = (id: number) => createSelector(
    selectShoppinglists,
    shoppinglists => shoppinglists.find(x => x.id === id)
);