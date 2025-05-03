import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {loadCoreIconSet,
  loadEssentialIconSet,
} from '@cds/core/icon';

loadCoreIconSet();
loadEssentialIconSet();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
