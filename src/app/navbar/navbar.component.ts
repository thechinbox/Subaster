import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  isCollapsed2 = true;
  isCollapsed3 = true;
  lista = ["Aceros y elementos metálicos ", "Electricidad",    "Artefactos sanitarios y gasfitería", "Revestimientos y estucos",
    "Maderas y muebles", "Equipos y herramientas", "Pinturas y accesorios", "Cerámicos y adhesivos", "Puertas y ventanas",
    "Residuos peligrosos", "Seguridad"];

  constructor() { }

  ngOnInit(): void {
  }

}
