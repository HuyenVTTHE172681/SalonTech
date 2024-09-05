import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonTabsComponent } from './salon-tabs.component';

describe('SalonTabsComponent', () => {
  let component: SalonTabsComponent;
  let fixture: ComponentFixture<SalonTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
