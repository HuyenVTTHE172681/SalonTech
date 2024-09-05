import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonAddAssignDataComponent } from './salon-add-assign-data.component';

describe('SalonAddAssignDataComponent', () => {
  let component: SalonAddAssignDataComponent;
  let fixture: ComponentFixture<SalonAddAssignDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonAddAssignDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonAddAssignDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
