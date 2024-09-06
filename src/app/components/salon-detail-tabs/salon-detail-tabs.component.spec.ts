import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailTabsComponent } from './salon-detail-tabs.component';

describe('SalonDetailTabsComponent', () => {
  let component: SalonDetailTabsComponent;
  let fixture: ComponentFixture<SalonDetailTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonDetailTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonDetailTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
