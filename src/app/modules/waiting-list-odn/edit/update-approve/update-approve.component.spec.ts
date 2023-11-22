import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApproveComponent } from './update-approve.component';

describe('UpdateApproveComponent', () => {
  let component: UpdateApproveComponent;
  let fixture: ComponentFixture<UpdateApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateApproveComponent]
    });
    fixture = TestBed.createComponent(UpdateApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
