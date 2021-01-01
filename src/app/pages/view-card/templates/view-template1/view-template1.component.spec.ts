/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewTemplate1Component } from './view-template1.component';

describe('ViewTemplate1Component', () => {
  let component: ViewTemplate1Component;
  let fixture: ComponentFixture<ViewTemplate1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTemplate1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTemplate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
