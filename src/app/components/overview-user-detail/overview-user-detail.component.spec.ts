import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserDetailComponent } from './overview-user-detail.component';

describe('OverviewUserDetailComponent', () => {
  let component: OverviewUserDetailComponent;
  let fixture: ComponentFixture<OverviewUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewUserDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
