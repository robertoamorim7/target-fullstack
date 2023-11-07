import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { LancamentoFormComponent } from './lancamento-form/lancamento-form.component';

const routes: Routes = [
  {
    path: 'lancamento-form',
    children: [
      {
        path: 'new',
        component: LancamentoFormComponent
      },
      {
        path: ':id',
        component: LancamentoFormComponent
      }
    ]
  },
  {
    path: '',
    component: LancamentoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
