import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnoModeloComponent } from './ano-modelo.component';

describe('AnoModeloComponent', () => {
  let component: AnoModeloComponent;
  let fixture: ComponentFixture<AnoModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnoModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnoModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
