import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MariageComponent } from './mariage.component';

describe('MariageComponent', () => {
  let component: MariageComponent;
  let fixture: ComponentFixture<MariageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MariageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MariageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
