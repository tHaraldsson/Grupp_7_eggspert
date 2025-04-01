import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EggTipsComponent } from './egg-tips.component';

describe('EggTipsComponent', () => {
  let component: EggTipsComponent;
  let fixture: ComponentFixture<EggTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EggTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EggTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
