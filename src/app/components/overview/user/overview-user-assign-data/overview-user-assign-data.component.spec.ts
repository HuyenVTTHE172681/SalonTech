import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserAssignDataComponent } from './overview-user-assign-data.component';

describe('OverviewUserAssignDataComponent', () => {
  let component: OverviewUserAssignDataComponent;
  let fixture: ComponentFixture<OverviewUserAssignDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewUserAssignDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewUserAssignDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
