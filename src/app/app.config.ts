import { ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './core/state/effects/user.effects';
import { MemberEffects } from './core/state/effects/member.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { userReducer } from './core/state/reducers/user.reducer';
import { memberReducer } from './core/state/reducers/member.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(ClarityModule),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }),
    provideEffects(UserEffects),
    provideEffects(MemberEffects),
    provideState({ name: 'user', reducer: userReducer }),
    provideState({ name: 'member', reducer: memberReducer })
  ]
};
