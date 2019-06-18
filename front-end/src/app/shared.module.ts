import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@sicoob/ui';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    UiModule
  ]
})
export class SharedModule { }
