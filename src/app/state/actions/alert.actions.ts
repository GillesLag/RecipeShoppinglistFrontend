import { createAction, props } from "@ngrx/store";

export const AlertAction = createAction(
    '[Alerts] AddAlert',
    props<{ message: string, types: 'success' | 'danger' | 'info' | 'warning'}>()
);