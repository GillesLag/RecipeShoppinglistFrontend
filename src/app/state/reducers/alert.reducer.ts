import { createReducer } from "@ngrx/store";
import { AlertAction } from '../actions/alert.actions'

export const AlertReducer = createReducer({
    on(AlertAction)
})