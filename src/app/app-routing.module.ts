import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PublishComponent } from './publish/publish.component';
import { UsComponent } from './us/us.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'publicar', component:PublishComponent},
  {path:'nosotros', component:UsComponent},
  {path:'login', component:LoginComponent}, 
  {path:'registro', component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }