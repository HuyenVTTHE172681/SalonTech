import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewServiceComponent } from './overview-service.component';

describe('OverviewServiceComponent', () => {
  let component: OverviewServiceComponent;
  let fixture: ComponentFixture<OverviewServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
