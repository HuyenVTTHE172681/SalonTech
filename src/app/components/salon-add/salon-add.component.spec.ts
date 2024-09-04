import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonAddComponent } from './salon-add.component';

describe('SalonAddComponent', () => {
  let component: SalonAddComponent;
  let fixture: ComponentFixture<SalonAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
