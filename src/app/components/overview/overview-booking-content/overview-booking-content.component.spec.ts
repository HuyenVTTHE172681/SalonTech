import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewBookingContentComponent } from './overview-booking-content.component';

describe('OverviewBookingContentComponent', () => {
  let component: OverviewBookingContentComponent;
  let fixture: ComponentFixture<OverviewBookingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewBookingContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewBookingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
