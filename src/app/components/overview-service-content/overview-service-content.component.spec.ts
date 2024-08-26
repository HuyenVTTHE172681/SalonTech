import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewServiceContentComponent } from './overview-service-content.component';

describe('OverviewServiceContentComponent', () => {
  let component: OverviewServiceContentComponent;
  let fixture: ComponentFixture<OverviewServiceContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewServiceContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewServiceContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
