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
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeAuthenticatedComponent } from './components/home-authenticated/home-authenticated.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

import { AuthService } from './components/authentication/auth.service';
import { UserService } from './services/user.service';
import { RecipeService } from './services/recipe.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CoreModule } from './components/core/core.module';
import { CreateComponent } from './components/recipe/create/create.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { DetailsComponent } from './components/recipe/details/details.component';
import { AllComponent } from './components/recipe/all/all.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    CreateComponent,
    EditComponent,
    DetailsComponent,
    AllComponent,
    PageNotFoundComponent,
    HomeAuthenticatedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    UserService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true

    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
