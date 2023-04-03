import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './component/menu/menu.component';
import { PanierComponent } from './component/panier/panier.component';

const routes: Routes = [
  {path: '', component: MenuComponent},  
  {path: 'panier', component: PanierComponent},  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
