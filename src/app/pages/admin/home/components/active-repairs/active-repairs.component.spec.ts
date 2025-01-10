import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRepairsComponent } from './active-repairs.component';

describe('ActiveRepairsComponent', () => {
  let component: ActiveRepairsComponent;
  let fixture: ComponentFixture<ActiveRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveRepairsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
