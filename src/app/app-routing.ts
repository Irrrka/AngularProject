import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeAuthenticatedComponent } from './components/home-authenticated/home-authenticated.component';
import { DetailsComponent } from './components/recipe/details/details.component';
import { CreateComponent } from './components/recipe/create/create.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    { path: 'home', component: HomeAuthenticatedComponent, canActivate: [AuthGuard] },
    { path: 'welcome', component: HomeComponent, },
    { path: 'login', component: LoginComponent, },
    { path: 'register', component: RegisterComponent, },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    { path: 'recipes/:id', component: DetailsComponent, canActivate: [AuthGuard]  },
    { path: 'recipes/:id/edit', component: EditComponent, canActivate: [AuthGuard]  },
    { path: 'share', component: CreateComponent, canActivate: [AuthGuard] },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', component: PageNotFoundComponent }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }