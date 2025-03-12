import { createReducer, on } from "@ngrx/store";
import { Shoppinglist } from "../models/Shoppinglist";
import { ShoppinglistActions } from "./shoppinglist.actions";

export const intitialState: Shoppinglist[] = []

export const shoppinglistReducer = createReducer(
    intitialState,
    on(ShoppinglistActions.addShoppinglist, (_state, { shoppinglist }) => [..._state, shoppinglist]),
    on(ShoppinglistActions.removeShoppinglist, (_state, { shoppinglistId }) => _state = _state.filter(x => x.id !== shoppinglistId)),
    on(ShoppinglistActions.setShoppinglists, (_state, { shoppinglists }) => _state = shoppinglists),
    on(ShoppinglistActions.updateShoppinglist, (_state, { shoppinglist }) => _state.map(x => x.id === shoppinglist.id ? shoppinglist : x)),
    on(ShoppinglistActions.removeIngredient, (_state, { shoppinglistId, ingredientId }) => {
        return _state.map(shoppinglist => {
            if (shoppinglist.id === shoppinglistId) {
                return { ...shoppinglist, shoppinglistIngredients: shoppinglist.shoppinglistIngredients.filter(x => x.id !== ingredientId) }
            }
            
            return shoppinglist
        }
    )})
)
