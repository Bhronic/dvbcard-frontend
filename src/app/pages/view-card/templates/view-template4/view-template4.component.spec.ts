/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewTemplate4Component } from './view-template4.component';

describe('ViewTemplate4Component', () => {
  let component: ViewTemplate4Component;
  let fixture: ComponentFixture<ViewTemplate4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTemplate4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTemplate4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
