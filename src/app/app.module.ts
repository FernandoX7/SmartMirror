import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Mirror } from '../pages/mirror/mirror';
import {FethWeatherService} from "../pages/mirror/weather-service";
import {SecretsService} from "../pages/mirror/secrets-service";

@NgModule({
  declarations: [
    MyApp,
    Home,
    Mirror
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Mirror
  ],
  providers: [FethWeatherService, SecretsService, FethWeatherService]
})
export class AppModule {}
