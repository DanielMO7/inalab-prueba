import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudInsumosComponent } from './crud-insumos.component';

describe('CrudInsumosComponent', () => {
  let component: CrudInsumosComponent;
  let fixture: ComponentFixture<CrudInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudInsumosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
