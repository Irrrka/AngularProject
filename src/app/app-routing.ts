import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeAuthenticatedComponent } from './components/home-authenticated/home-authenticated.component';
import { CreateComponent } from './components/recipe/create/create.component';
import { DetailsComponent } from './components/recipe/details/details.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { AllComponent } from './components/recipe/all/all.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    //{ path: 'home', component: HomeAuthenticatedComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: LoginComponent, },
    { path: 'signup', component: RegisterComponent, },
    { path: 'recipes/share', component: CreateComponent, },
    { path: 'recipes/:id', component: DetailsComponent, },
    { path: 'recipes/all', component: AllComponent, },
    { path: '**', component: PageNotFoundComponent }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }