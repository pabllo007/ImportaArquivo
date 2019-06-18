
/**
 * @description Arquivo para declaração de módulos da aplicação
 * @author gilluan.sousa <gilluan.sousa@sicoob.com.br>
 *
 */

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { reducers, metaReducers } from './reducers';
import { AppEffects } from './app.effects';
import { environment } from '../environments/environment';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { UiModule, NavbarModule, ToolbarModule, HeaderModule, SidebarContainerModule } from '@sicoob/ui';
// import { CoreModule } from '@sicoob/core';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AuthModule } from '@sicoob/security';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';

export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

// Modulos que serão importados no app.module
export const MODULES = [
  BrowserModule,
  AppRoutingModule,
  HttpClientModule,

  // Angular Forms
  FormsModule,
  ReactiveFormsModule,

  // Cdk Modules
  PortalModule,
  OverlayModule,

  // Ngx Translate
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),

  StoreModule.forRoot(
    reducers, { metaReducers }
  ),

  StoreRouterConnectingModule.forRoot({
    stateKey: 'router',
  }),

  NgxDatatableModule,

  !environment.PRODUCTION ? StoreDevtoolsModule.instrument() : [],
  EffectsModule.forRoot([AppEffects]),
  UiModule,
  AuthModule.forRoot({
    apiGateway: environment.API_GATEWAY,
    authGateway: environment.AUTH_GATEWAY,
    ssoGateway: environment.SSO_GATEWAY,
    applicationToken: environment.APPLICATION_TOKEN,
    revokeGateway: environment.REVOKE_GATEWAY,
    sessionTokenService: !environment.PRODUCTION ? 'http://localhost:4200' : window.location.href,
    indexRoute: '/home',
    unAuthorizedRoute: '/unauthorized'
  }),
  NavbarModule,
  ToolbarModule,
  HeaderModule,
  SidebarContainerModule
];


// Módulos que serão exportados no app.module
