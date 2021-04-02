import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverEmailComponent } from './recover-email.component';

describe('RecoverEmailComponent', () => {
  let component: RecoverEmailComponent;
  let fixture: ComponentFixture<RecoverEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
