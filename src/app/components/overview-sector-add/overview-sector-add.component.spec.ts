import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectorAddComponent } from './overview-sector-add.component';

describe('OverviewSectorAddComponent', () => {
  let component: OverviewSectorAddComponent;
  let fixture: ComponentFixture<OverviewSectorAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewSectorAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSectorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
