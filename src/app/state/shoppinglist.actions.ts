import { createActionGroup, props } from '@ngrx/store'
import { Shoppinglist } from '../models/Shoppinglist'
import { ShoppinglistIngredient } from '../models/ShoppinglistIngredient';
import { Recipe } from '../models/Recipe';

export const ShoppinglistActions = createActionGroup({
    source: 'Shoppinglists',
    events: {
        'Add Shoppinglist': props<{ shoppinglist: Shoppinglist }>(),
        'Remove Shoppinglist': props<{ shoppinglistId: number }>(),
        'Set Shoppinglists': props<{ shoppinglists: Shoppinglist[] }>(),
        'Add Ingredients': props<{ shoppinglistId: number, recipe: Recipe }>()
    }
});

export const ShoppinglistApiActions = createActionGroup({
    source: 'Shoppinglist API',
    events: {
        'Retrieve Shoppinglists': props<{ shoppinglists: Shoppinglist[] }>()
    }
})