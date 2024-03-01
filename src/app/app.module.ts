import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment'
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';;
import { getFirestore,provideFirestore } from '@angular/fire/firestore'; // Importa módulos de Firebase de la forma compatible

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule,   provideFirebaseApp(() => initializeApp( environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp({"projectId":"sumativa-85912","appId":"1:1055581430072:web:f68e0cb06b153602b321cd","storageBucket":"sumativa-85912.appspot.com","apiKey":"AIzaSyCIwgMulYiQwIfbsVLUUFJ4tQmfJ9a_m6I","authDomain":"sumativa-85912.firebaseapp.com","messagingSenderId":"1055581430072"}))],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
