import {provideZonelessChangeDetection} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {describe, expect, test} from 'vitest';
import {App} from './app';

describe('App', () => {
  async function setup() {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();
  }

  test('should create the app', async () => {
    await setup();
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
