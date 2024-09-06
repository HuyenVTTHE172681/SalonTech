import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonAddInformationComponent } from './salon-add-information.component';

describe('SalonAddInformationComponent', () => {
  let component: SalonAddInformationComponent;
  let fixture: ComponentFixture<SalonAddInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonAddInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalonAddInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
