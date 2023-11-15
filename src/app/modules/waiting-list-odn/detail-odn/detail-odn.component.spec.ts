import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOdnComponent } from './detail-odn.component';

describe('DetailOdnComponent', () => {
  let component: DetailOdnComponent;
  let fixture: ComponentFixture<DetailOdnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailOdnComponent]
    });
    fixture = TestBed.createComponent(DetailOdnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
