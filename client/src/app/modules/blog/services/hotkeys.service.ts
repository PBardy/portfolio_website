import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Hotkeys {
  defaults: Partial<Options> = {
    element: this.document,
  };

  constructor(
    private eventManager: EventManager,
    @Inject(DOCUMENT) private document: Document
  ) {}

  public addShortcut(options: Partial<Options>) {
    const merged = { ...this.defaults, ...options };
    const event = `keydown.${merged.keys}`;

    return new Observable((observer) => {
      const handler = (event: any) => {
        event.preventDefault();
        observer.next(event);
      };

      const dispose = this.eventManager.addEventListener(
        merged.element,
        event,
        handler
      );

      return () => dispose();
    });
  }
}

type Options = {
  element: any;
  keys: string;
};
