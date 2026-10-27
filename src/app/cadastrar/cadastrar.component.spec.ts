import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarComponent } from './cadastrar.component';

describe('cadastrar', () => {
  let component: CadastrarComponent;
  let fixture: ComponentFixture<CadastrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
