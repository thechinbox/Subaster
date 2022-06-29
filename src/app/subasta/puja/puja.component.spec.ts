import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PujaComponent } from './puja.component';

describe('PujaComponent', () => {
  let component: PujaComponent;
  let fixture: ComponentFixture<PujaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PujaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PujaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
