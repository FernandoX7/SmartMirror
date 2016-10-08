import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { Mirror } from '../pages/mirror/mirror';

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
  providers: []
})
export class AppModule {}
