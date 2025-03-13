import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { Shoppinglist } from '../../models/Shoppinglist'
import { CreateShoppinglistDto } from '../../models/dtos/CreateShoppinglistDto';
import { UpdateShoppinglistDto } from '../../models/dtos/UpdateShoppinglistDto';

export const ShoppinglistActions = createActionGroup({
    source: 'LoadShoppinglists',
    events: {
        'Load Shoppinglists': emptyProps(),
        'Load Shoppinglists Success': props<{ shoppinglists: Shoppinglist[] }>(),
        'Load Shoppinglists Failure': props<{ error: string }>(),
        'Update Shoppinglist': props<{ updatedShoppinglist: UpdateShoppinglistDto }>(),
        'Update Shoppinglist Success': props<{ shoppinglist: Shoppinglist }>(),
        'Update Shoppinglist Failure': props<{ error: string }>(),
        'Create Shoppinglist': props<{ newShoppinglist: CreateShoppinglistDto }>(),
        'Create Shoppinglist Success': props<{ shoppinglist: Shoppinglist }>(),
        'Create Shopppinglist Failure': props<{ error: string }>()
    }
});