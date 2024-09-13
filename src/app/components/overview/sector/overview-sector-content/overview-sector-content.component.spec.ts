import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectorContentComponent } from './overview-sector-content.component';

describe('OverviewSectorContentComponent', () => {
  let component: OverviewSectorContentComponent;
  let fixture: ComponentFixture<OverviewSectorContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewSectorContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSectorContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
