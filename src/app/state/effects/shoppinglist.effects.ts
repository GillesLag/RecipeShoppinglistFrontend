import { inject, Injectable } from "@angular/core";
import { ShoppinglistService } from "../../services/shoppinglist.service";
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ShoppinglistActions } from "../actions/shoppinglist.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AlertService } from "../../services/alert.service";
import { Shoppinglist } from "../../models/Shoppinglist";

@Injectable()
export class ShoppinglistEffects {
    private actions$ = inject(Actions)
    private shoppinglistService = inject(ShoppinglistService)
    private alertService = inject(AlertService)

    loadShoppinglists$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShoppinglistActions.loadShoppinglists),
            mergeMap(() => this.shoppinglistService.getAllShoppinglists().pipe(
                map((shoppinglists) => ShoppinglistActions.loadShoppinglistsSuccess({ shoppinglists })),
                catchError(error => of(ShoppinglistActions.loadShoppinglistsFailure({ error: error.message })))
            ))
        );
    })

    updateShoppinglist$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShoppinglistActions.updateShoppinglist),
            mergeMap(({ updatedShoppinglist }) => this.shoppinglistService.updateShoppinglist(updatedShoppinglist.id, updatedShoppinglist).pipe(
                map((shoppinglist: Shoppinglist) => ShoppinglistActions.updateShoppinglistSuccess({ shoppinglist })),
                tap(() => this.alertService.addAlert(`The shoppinglist: ${updatedShoppinglist.name} is successfully updated!`, 'success')),
                catchError(error => {
                    this.alertService.addAlert(`There was an error when updating the shoppinglist: ${updatedShoppinglist.name}`, 'danger')
                    return of(ShoppinglistActions.updateShoppinglistFailure({ error: error.message }))
                })
            ))
        );
    })

    createShoppinglist$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShoppinglistActions.createShoppinglist),
            mergeMap(({newShoppinglist}) => this.shoppinglistService.createShoppinglist(newShoppinglist).pipe(
                map(shoppinglist => ShoppinglistActions.createShoppinglistSuccess({shoppinglist})),
                tap(() => this.alertService.addAlert(`New Shoppinglist ${newShoppinglist.name} successfully created`, 'success')),
                catchError(error => {
                    this.alertService.addAlert(`Failed To Create Shoppinglist: ${newShoppinglist.name}`, 'danger' );
                    return of(ShoppinglistActions.createShopppinglistFailure({error: error.message}))
                }
            ))
        ))
    });

    deleteShoppinglist$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShoppinglistActions.deleteShoppinglist),
            mergeMap(({id}) => this.shoppinglistService.deleteShoppinglist(id).pipe(
                map(id => ShoppinglistActions.deleteShoppinglistSuccess({id})),
                catchError(error => of(ShoppinglistActions.deleteShoppinglistFailure({error: error.message})))
            ))
        )
    })
}