import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing';


import { AppComponent } from './app.component';
import { NavigationComponent } from './components/core/navigation/navigation.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeAuthenticatedComponent } from './components/home-authenticated/home-authenticated.component';

import { AuthService } from './components/authentication/auth.service';
import { RecipeService } from './services/recipe.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CoreModule } from './components/core/core.module';
import { DetailsComponent } from './components/recipe/details/details.component';
import { RecipeModule } from './components/recipe/recipe.module';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    PageNotFoundComponent,
    HomeAuthenticatedComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecipeModule
  ],
  providers: [
    AuthService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true

    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
