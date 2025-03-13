import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { shoppinglistReducer } from './state/reducers/shoppinglist.reducer'
import { provideEffects } from '@ngrx/effects';
import { ShoppinglistEffects } from './state/effects/shoppinglist.effects';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideStore(),
        provideState({ name: 'shoppinglistState', reducer: shoppinglistReducer }),
        provideEffects([ShoppinglistEffects])
    ]
}