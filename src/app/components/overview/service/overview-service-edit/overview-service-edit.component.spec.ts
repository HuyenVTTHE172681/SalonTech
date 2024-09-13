import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewServiceEditComponent } from './overview-service-edit.component';

describe('OverviewServiceEditComponent', () => {
  let component: OverviewServiceEditComponent;
  let fixture: ComponentFixture<OverviewServiceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewServiceEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
