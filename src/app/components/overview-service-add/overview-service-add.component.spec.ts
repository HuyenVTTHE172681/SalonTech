import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewServiceAddComponent } from './overview-service-add.component';

describe('OverviewServiceAddComponent', () => {
  let component: OverviewServiceAddComponent;
  let fixture: ComponentFixture<OverviewServiceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewServiceAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
