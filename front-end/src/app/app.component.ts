import { Component, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';

import { SidebarContainerComponent, ToolbarItem, NavItem } from '@sicoob/ui';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioSicoob, RevokeAccessToken } from '@sicoob/security';
import * as fromAuth from '@sicoob/security';
import { Store, select } from '@ngrx/store';



@Component({
  selector: 'sc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./app.component.html`,
})
export class AppComponent implements OnInit {

  @ViewChild(SidebarContainerComponent) sidebarContainerComponent: SidebarContainerComponent = {} as any;

  /**
   * Estrutura adicionar um link de menu para o toolbar
   * Observação: A biblioteca de ícones utilizada é a (material icons)
   */
  itemsToolbar: ToolbarItem[] = [
    { displayName: 'Forms', iconName: 'mdi-24px mdi-code-tags', route: '/' },
  ];

  /**
   * Estrutura para adicionar um item para o navbar
   */
  itemsNavbar: NavItem[] = [
    { displayName: 'Notificações', iconName: 'mail', disabled: true },
    { displayName: 'Pessoa', iconName: 'face', disabled: false },
  ];

  /**
   * Informações do usuário logado
   */
  user$: Observable<UsuarioSicoob> = of({
    login: 'login',
    nome: 'Nome Temporário',
    cpf: '123.456.789-00',
    email: 'login@sicoob.com.br',
    numeroCooperativa: 300,
    idInstituicaoOrigem: 2,
    idUnidadeInstOrigem: 0,
    dataHoraUltimoLogin: 0,
    avatar: {
      foto: 'assets/images/ico-person.svg'
    }
  });

  constructor(
    public translate: TranslateService,
    public authStore$: Store<fromAuth.State>
  ) {
    this.configureTranslate();
  }

  // Ao iniciar o angular busca o usuário
  ngOnInit() {
    // Seleciona o usuário da store de autenticação
    // this.user$ = this.authStore$.pipe(select(fromAuth.selectSicoobUser));
  }

  // Cria as configurações de idioma
  configureTranslate() {
    this.translate.setDefaultLang('pt-br');
    this.translate.use('pt-br');
  }

  // Remove as permissões de acesso e redireciona para o CAS remover os cookies.
  logout() {
    this.authStore$.dispatch(new RevokeAccessToken());
  }

  onItemClick($event) {
    console.log($event);
  }

  isClosed(): Observable<boolean> {
    return this.sidebarContainerComponent.isClosed$;
  }
}
