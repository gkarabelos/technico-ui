import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOwnerComponent } from './search-owner.component';

describe('SearchOwnerComponent', () => {
  let component: SearchOwnerComponent;
  let fixture: ComponentFixture<SearchOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
