import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutFleuristeComponent } from './ajout-fleuriste.component';

describe('AjoutFleuristeComponent', () => {
  let component: AjoutFleuristeComponent;
  let fixture: ComponentFixture<AjoutFleuristeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutFleuristeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutFleuristeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
