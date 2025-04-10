import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedEggTipsComponent } from './finished-egg-tips.component';

describe('FinishedEggTipsComponent', () => {
  let component: FinishedEggTipsComponent;
  let fixture: ComponentFixture<FinishedEggTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedEggTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedEggTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
