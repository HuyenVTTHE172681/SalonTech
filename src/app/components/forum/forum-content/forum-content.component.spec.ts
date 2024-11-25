import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumContentComponent } from './forum-content.component';

describe('ForumContentComponent', () => {
  let component: ForumContentComponent;
  let fixture: ComponentFixture<ForumContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForumContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
