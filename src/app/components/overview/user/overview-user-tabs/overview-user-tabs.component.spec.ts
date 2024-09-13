import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserTabsComponent } from './overview-user-tabs.component';

describe('OverviewUserTabsComponent', () => {
  let component: OverviewUserTabsComponent;
  let fixture: ComponentFixture<OverviewUserTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewUserTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewUserTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
