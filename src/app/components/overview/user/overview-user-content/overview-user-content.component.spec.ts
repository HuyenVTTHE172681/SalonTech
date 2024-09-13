import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserContentComponent } from './overview-user-content.component';

describe('OverviewUserContentComponent', () => {
  let component: OverviewUserContentComponent;
  let fixture: ComponentFixture<OverviewUserContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewUserContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewUserContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
