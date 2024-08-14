import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBidsOfProductComponent } from './all-bids-of-product.component';

describe('AllBidsOfProductComponent', () => {
  let component: AllBidsOfProductComponent;
  let fixture: ComponentFixture<AllBidsOfProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBidsOfProductComponent]
    });
    fixture = TestBed.createComponent(AllBidsOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
