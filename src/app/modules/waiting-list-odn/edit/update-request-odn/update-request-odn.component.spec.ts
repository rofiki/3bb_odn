import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestOdnComponent } from './update-request-odn.component';

describe('UpdateRequestOdnComponent', () => {
  let component: UpdateRequestOdnComponent;
  let fixture: ComponentFixture<UpdateRequestOdnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateRequestOdnComponent]
    });
    fixture = TestBed.createComponent(UpdateRequestOdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
