import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContributeComponent } from './components/screens/contribute/contribute.component';
import { HomeComponent } from './components/screens/home/home.component';
import { AboutComponent } from './components/screens/about/about.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contribute',
    component: ContributeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
