/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Template6Component } from './template6.component';

describe('Template6Component', () => {
  let component: Template6Component;
  let fixture: ComponentFixture<Template6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Template6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Template6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
