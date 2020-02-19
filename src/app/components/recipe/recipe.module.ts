import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { AllComponent } from './all/all.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [DetailsComponent, CreateComponent, EditComponent, AllComponent],
  exports: [
    RecipeModule,
  ]
})
export class RecipeModule { }
