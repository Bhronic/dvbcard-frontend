/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewTemplate7Component } from './view-template7.component';

describe('ViewTemplate7Component', () => {
  let component: ViewTemplate7Component;
  let fixture: ComponentFixture<ViewTemplate7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTemplate7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTemplate7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
