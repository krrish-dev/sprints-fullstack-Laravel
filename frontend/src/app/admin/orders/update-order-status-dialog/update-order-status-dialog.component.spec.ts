import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderStatusDialogComponent } from './update-order-status-dialog.component';

describe('UpdateOrderStatusDialogComponent', () => {
  let component: UpdateOrderStatusDialogComponent;
  let fixture: ComponentFixture<UpdateOrderStatusDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateOrderStatusDialogComponent]
    });
    fixture = TestBed.createComponent(UpdateOrderStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
