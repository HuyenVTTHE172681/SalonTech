import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewSectorEditComponent } from './overview-sector-edit.component';

describe('OverviewSectorEditComponent', () => {
  let component: OverviewSectorEditComponent;
  let fixture: ComponentFixture<OverviewSectorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewSectorEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewSectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
