/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewTemplate8Component } from './view-template8.component';

describe('ViewTemplate8Component', () => {
  let component: ViewTemplate8Component;
  let fixture: ComponentFixture<ViewTemplate8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTemplate8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTemplate8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
