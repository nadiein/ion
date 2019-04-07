/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Create.articleComponent } from './create.article.component';

describe('Create.articleComponent', () => {
  let component: Create.articleComponent;
  let fixture: ComponentFixture<Create.articleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create.articleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create.articleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
