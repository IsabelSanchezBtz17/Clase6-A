import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetCharacterResolver } from './libs/resolvers/get-character.resolver';
import { NotFoundComponent } from './module/uno/components/not-found/not-found.component';

const routes: Routes = [

  {
    path: '',
    resolve:{
      personaje: GetCharacterResolver

    },
    children: [
      {
        path: '',
        redirectTo: 'character',
        pathMatch: 'full'
      },
      {
        path: 'character',
        loadChildren: () => import('./module/uno/uno.module').then(m => m.UnoModule)
      }

    ]


  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }

];


@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
