import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserAddComponent } from './overview-user-add.component';

describe('OverviewUserAddComponent', () => {
  let component: OverviewUserAddComponent;
  let fixture: ComponentFixture<OverviewUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OverviewUserAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
