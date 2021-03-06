import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublishComponent } from './publish/publish.component';
import { UsComponent } from './us/us.component';
import { RegistroComponent } from './registro/registro.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { BrowserComponent } from './browser/browser.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { PermisosGuard } from './guards/permisos.guard';
import { RecoveryComponent } from './login/recovery/recovery.component';
import { MapComponent } from './map/map.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { BusquedaComponent } from './browser/busqueda/busqueda.component';
import { SubastaComponent } from './subasta/subasta.component';

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
  {path:'recovery', component:RecoveryComponent},
  {path:'registro', component:RegistroComponent},
  {path:'browser', component:BrowserComponent},
  {path:'carrito', component:ShoppingcartComponent},
  {path:'mapa', component:MapComponent},
  {path:'404', component:NotFoundComponent},
  {path:'ajustes', component:AjustesComponent},
  {path:'search', component:BusquedaComponent},
  {path:'subasta/:id', component:SubastaComponent},
  {path:'**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
