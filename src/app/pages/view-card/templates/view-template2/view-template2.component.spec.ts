/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewTemplate2Component } from './view-template2.component';

describe('ViewTemplate2Component', () => {
  let component: ViewTemplate2Component;
  let fixture: ComponentFixture<ViewTemplate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTemplate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTemplate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
