import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailAssignDataComponent } from './salon-detail-assign-data.component';

describe('SalonDetailAssignDataComponent', () => {
  let component: SalonDetailAssignDataComponent;
  let fixture: ComponentFixture<SalonDetailAssignDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonDetailAssignDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonDetailAssignDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
