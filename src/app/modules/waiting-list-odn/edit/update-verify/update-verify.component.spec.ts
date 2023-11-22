import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVerifyComponent } from './update-verify.component';

describe('UpdateVerifyComponent', () => {
  let component: UpdateVerifyComponent;
  let fixture: ComponentFixture<UpdateVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateVerifyComponent]
    });
    fixture = TestBed.createComponent(UpdateVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
