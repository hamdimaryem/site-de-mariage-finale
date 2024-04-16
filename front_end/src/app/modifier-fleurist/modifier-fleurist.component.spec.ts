import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierFleuristComponent } from './modifier-fleurist.component';

describe('ModifierFleuristComponent', () => {
  let component: ModifierFleuristComponent;
  let fixture: ComponentFixture<ModifierFleuristComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierFleuristComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierFleuristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
