import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTimmerViewComponent } from './basic-timmer-view.component';

describe('BasicTimmerViewComponent', () => {
  let component: BasicTimmerViewComponent;
  let fixture: ComponentFixture<BasicTimmerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicTimmerViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicTimmerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
