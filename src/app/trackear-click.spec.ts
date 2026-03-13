import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TrackearClick } from './trackear-click';

@Component({
  standalone: true,
  imports: [TrackearClick],
  template: '<button appTrackearClick="test.tag">Track</button>'
})
class HostTrackearClickComponent {}

describe('TrackearClick', () => {
  let fixture: ComponentFixture<HostTrackearClickComponent>;
  const storeMock = {
    dispatch: jasmine.createSpy('dispatch')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostTrackearClickComponent],
      providers: [{ provide: Store, useValue: storeMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(HostTrackearClickComponent);
    fixture.detectChanges();
  });

  it('should dispatch tracking action on click', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(storeMock.dispatch).toHaveBeenCalled();
  });
});
