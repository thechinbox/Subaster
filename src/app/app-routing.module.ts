import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublishComponent } from './publish/publish.component';
import { UsComponent } from './us/us.component';
import { RegistroComponent } from './registro/registro.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { BrowserComponent } from './browser/browser.component';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { PermisosGuard } from './guards/permisos.guard';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    path:'home',
    component:HomeComponent,
  },
  {path:'publicar', component:PublishComponent},
  {path:'publicacion/:id', component:PublicacionComponent},
  {path:'nosotros', component:UsComponent},
  {path:'login', component:LoginComponent, canActivate : [PermisosGuard]},
  {path:'registro', component:RegistroComponent},
  {path:'browser', component:BrowserComponent},
  {path:'profile', component:ProfileComponent},
  {path:'carrito', component:ShoppingcartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
