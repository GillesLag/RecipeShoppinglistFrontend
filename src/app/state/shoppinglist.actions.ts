import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Shoppinglist } from '../models/Shoppinglist'

export const ShoppinglistActions = createActionGroup({
    source: 'Shoppinglists',
    events: {
        'Load Shoppinglists': emptyProps(),
        'Load Shoppinglists Success': props<{ shoppinglists: Shoppinglist[] }>(),
        'Load Shoppinglists Failure': props<{ error: string }>(),
        'Add Shoppinglist': props<{ shoppinglist: Shoppinglist }>(),
        'Remove Shoppinglist': props<{ shoppinglistId: number }>(),
        'Set Shoppinglists': props<{ shoppinglists: Shoppinglist[] }>(),
        'Update Shoppinglist': props<{ shoppinglist: Shoppinglist}>(),
        'Remove Ingredient': props<{ shoppinglistId: number, ingredientId: number }>()
    }
});