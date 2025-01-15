import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRepairsFormComponent } from './update-repairs-form.component';

describe('UpdateRepairsFormComponent', () => {
  let component: UpdateRepairsFormComponent;
  let fixture: ComponentFixture<UpdateRepairsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateRepairsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRepairsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
