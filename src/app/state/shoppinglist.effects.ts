import { inject, Injectable } from "@angular/core";
import { ShoppinglistService } from "../services/shoppinglist.service";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ShoppinglistActions } from "./shoppinglist.actions";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class ShoppinglistEffects {
    private actions$ = inject(Actions)
    private shoppinglistService = inject(ShoppinglistService)

    loadShoppinglists$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShoppinglistActions.loadShoppinglists),
            mergeMap(() => this.shoppinglistService.getAllShoppinglists().pipe(
                map((shoppinglists) => ShoppinglistActions.loadShoppinglistsSuccess({ shoppinglists: shoppinglists })),
                catchError(error => of(ShoppinglistActions.loadShoppinglistsFailure({ error: error.message })))
            ))
        );
    })
}