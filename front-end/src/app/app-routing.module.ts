import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent, AuthGuard } from '@sicoob/security';
import { DataTableSelectionComponent } from '@swimlane/ngx-datatable';

const routes: Routes = [
  // Rota de Exemplo
  //  {
  //   path: 'todo',
  //   loadChildren: './funcionalidades/todo/todo.module#TodoModule',
  //   data: {
  //     breadcrumb: "Nome"
  //   }
  // },
  // {
  //   path: '**', component: NotFoundPageComponent
  // },
  // {
  //   path: '', // Esta rota inicia o login do usuário
  //   component: CallbackComponent
  // },
  // {
  //   path: '/unauthorized', // Quando o usuário não pode acessar o componente baseado no AuthGuard
  //   component: UnAuthorizedComponent
  // }
  // {
  //   path: 'minhaRota', // Esta é uma rota espefífica do usuário.
  //   component: MinhaRotaComponent,
  //   canActivate: [AuthGuard]
  // },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
