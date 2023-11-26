import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginedManageComponent } from './logined-manage.component';

describe('LoginedManageComponent', () => {
  let component: LoginedManageComponent;
  let fixture: ComponentFixture<LoginedManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginedManageComponent]
    });
    fixture = TestBed.createComponent(LoginedManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
