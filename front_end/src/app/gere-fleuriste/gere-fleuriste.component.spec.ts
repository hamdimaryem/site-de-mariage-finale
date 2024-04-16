import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GereFleuristeComponent } from './gere-fleuriste.component';

describe('GereFleuristeComponent', () => {
  let component: GereFleuristeComponent;
  let fixture: ComponentFixture<GereFleuristeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GereFleuristeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GereFleuristeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
