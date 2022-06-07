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
    ProfileComponent
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
