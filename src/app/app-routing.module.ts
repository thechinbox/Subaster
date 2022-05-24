import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublishComponent } from './publish/publish.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'publicar', component:PublishComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
