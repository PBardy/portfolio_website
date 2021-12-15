import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionsMenuComponent } from './card-options-menu.component';

describe('CardOptionsMenuComponent', () => {
  let component: CardOptionsMenuComponent;
  let fixture: ComponentFixture<CardOptionsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOptionsMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOptionsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
