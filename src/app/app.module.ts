import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { GooglePlacesAPIClientService } from './services/google-places-api-client/google-places-api-client.service';
import { HomeComponent } from './components/screens/home/home.component';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { AboutComponent } from './components/screens/about/about.component';
import { RoasterDetailsComponent } from './components/roaster-details/roaster-details.component';
import { EncodeURIComponentPipe } from './pipes/encode-uricomponent.pipe';
import { ConnectivityService } from './services/connectivity/connectivity.service';
import { RoastersService } from './services/roasters/roasters.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavBarComponent,
    FooterBarComponent,
    AboutComponent,
    RoasterDetailsComponent,
    EncodeURIComponentPipe
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ConnectivityService,
    GooglePlacesAPIClientService,
    RoastersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
