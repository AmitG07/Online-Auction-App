import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBidComponent } from './my-bid.component';

describe('MyBidComponent', () => {
  let component: MyBidComponent;
  let fixture: ComponentFixture<MyBidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBidComponent]
    });
    fixture = TestBed.createComponent(MyBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
