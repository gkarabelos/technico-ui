import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairsFormComponent } from './repairs-form.component';

describe('RepairsFormComponent', () => {
  let component: RepairsFormComponent;
  let fixture: ComponentFixture<RepairsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepairsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepairsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
