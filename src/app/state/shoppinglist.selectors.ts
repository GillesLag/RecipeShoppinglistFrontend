import { createSelector } from "@ngrx/store";
import { AppState } from "./appState";

export const selectShoppinglist = (state: AppState) => state.shoppinglists;

export const selectShoppinglistById = (id: number) => createSelector(
    selectShoppinglist,
    (shoppinglists) => shoppinglists.find(x => x.id === id)
);