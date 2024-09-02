import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRevenueContentComponent } from './overview-revenue-content.component';

describe('OverviewRevenueContentComponent', () => {
  let component: OverviewRevenueContentComponent;
  let fixture: ComponentFixture<OverviewRevenueContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewRevenueContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewRevenueContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
