import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoHotelesComponent } from './contenido-hoteles.component';

describe('ContenidoHotelesComponent', () => {
  let component: ContenidoHotelesComponent;
  let fixture: ComponentFixture<ContenidoHotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoHotelesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
