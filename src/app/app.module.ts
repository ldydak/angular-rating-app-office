import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgxPaginationModule } from 'ngx-pagination';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './login/auth.guard';
import { ErrorComponent } from './error/error.component';


const config = {
  apiKey: "AIzaSyCNK2jnePR_hmOOfNnQKzfZZvsr3b_TDzI",
  authDomain: "test-ab3c8.firebaseapp.com",
  databaseURL: "https://test-ab3c8.firebaseio.com",
  projectId: "test-ab3c8",
  storageBucket: "test-ab3c8.appspot.com",
  messagingSenderId: "138095144702"
};

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ResultsComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule, NgSelectModule, FormsModule, NgxPaginationModule, AngularFireModule.initializeApp(config), AngularFirestoreModule, AngularFireAuthModule, RouterModule.forRoot(routes)

  ],
  providers: [ResultsComponent, AdminComponent, { provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
