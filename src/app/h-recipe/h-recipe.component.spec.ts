import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRecipeComponent } from './h-recipe.component';

describe('HRecipeComponent', () => {
  let component: HRecipeComponent;
  let fixture: ComponentFixture<HRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HRecipeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
