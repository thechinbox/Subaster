import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { PublishComponent } from './publish/publish.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { UsComponent } from './us/us.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { RegistroComponent } from './registro/registro.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { PublicationService } from './data/Services/publication.service';

import { UserService } from './data/Services/user.service';
import { BrowserComponent } from './browser/browser.component';
import { MenuItemsService } from './data/Services/menu-items.service';
import { ProfileComponent } from './profile/profile.component';
import { StorageService } from './data/Services/storage.service';
import { AttributesService } from './data/Services/attributes.service';
import { BrowseService } from './data/Services/browse.service';
import { ChileinfoService } from './data/Services/chileinfo.service';
import { CategoriasComponent } from './browser/categorias/categorias.component';
import { ModalComponent } from './publicacion/modal/modal.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { RecoveryComponent } from './login/recovery/recovery.component';
import { MapComponent } from './map/map.component';
import { VerimagenComponent } from './publicacion/verimagen/verimagen.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { MenuLateralComponent } from './ajustes/menu-lateral/menu-lateral.component';
import { EditProfileComponent } from './ajustes/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './ajustes/change-password/change-password.component';
import { BusquedaComponent } from './browser/busqueda/busqueda.component';
import { SubastaComponent } from './subasta/subasta.component';
import { PujaComponent } from './subasta/puja/puja.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PublishComponent,
    HeaderComponent,
    NavbarComponent,
    UsComponent,
    LoginComponent,
    FooterComponent,
    RegistroComponent,
    PublicacionComponent,
    BrowserComponent,
    ProfileComponent,
    CategoriasComponent,
    ModalComponent,
    ShoppingcartComponent,
    RecoveryComponent,
    MapComponent,
    VerimagenComponent,
    NotFoundComponent,
    AjustesComponent,
    MenuLateralComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    BusquedaComponent,
    SubastaComponent,
    PujaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IvyCarouselModule,
    GoogleMapsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, PublicationService, MenuItemsService,
              StorageService, AttributesService,
              BrowseService, ChileinfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
