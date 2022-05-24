import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lista = ["a","b","c","d","e"]

  constructor() { }

  ngOnInit(): void {
  }

  getheight(){
    return screen.height/2;
  }
}
