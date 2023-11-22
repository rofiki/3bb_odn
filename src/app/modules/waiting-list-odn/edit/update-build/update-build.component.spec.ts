import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBuildComponent } from './update-build.component';

describe('UpdateBuildComponent', () => {
  let component: UpdateBuildComponent;
  let fixture: ComponentFixture<UpdateBuildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBuildComponent]
    });
    fixture = TestBed.createComponent(UpdateBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
