import { NgModule } from '@angular/core';
import { MODULES } from './declarations';
import { SharedModule } from './shared.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [MODULES],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SharedModule],
  entryComponents: []
})
export class AppModule { }
