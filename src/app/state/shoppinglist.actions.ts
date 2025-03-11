import { createActionGroup, props } from '@ngrx/store'
import { Shoppinglist } from '../models/Shoppinglist'

export const ShoppinglistActions = createActionGroup({
    source: 'Shoppinglists',
    events: {
        'Add Shoppinglist': props<{ shoppinglist: Shoppinglist }>(),
        'Remove Shoppinglist': props<{ shoppinglistId: number }>(),
        'Set Shoppinglists': props<{ shoppinglists: Shoppinglist[] }>(),
    }
});