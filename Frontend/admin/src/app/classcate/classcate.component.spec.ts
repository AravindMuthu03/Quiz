import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasscateComponent } from './classcate.component';

describe('ClasscateComponent', () => {
  let component: ClasscateComponent;
  let fixture: ComponentFixture<ClasscateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasscateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasscateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
