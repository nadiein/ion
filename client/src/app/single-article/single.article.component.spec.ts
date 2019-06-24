/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Single.articleComponent } from './single.article.component';

describe('Single.articleComponent', () => {
  let component: Single.articleComponent;
  let fixture: ComponentFixture<Single.articleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Single.articleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Single.articleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
