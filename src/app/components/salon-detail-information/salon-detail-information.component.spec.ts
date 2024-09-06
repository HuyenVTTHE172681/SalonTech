import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailInformationComponent } from './salon-detail-information.component';

describe('SalonDetailInformationComponent', () => {
  let component: SalonDetailInformationComponent;
  let fixture: ComponentFixture<SalonDetailInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonDetailInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonDetailInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
