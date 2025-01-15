import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOwnerComponent } from './update-owner.component';

describe('UpdateOwnerComponent', () => {
  let component: UpdateOwnerComponent;
  let fixture: ComponentFixture<UpdateOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
