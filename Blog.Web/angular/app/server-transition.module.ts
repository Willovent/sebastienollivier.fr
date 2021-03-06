import { DOCUMENT, ɵgetDOM, ɵTRANSITION_ID } from '@angular/platform-browser';
import { APP_BOOTSTRAP_LISTENER, APP_ID, ModuleWithProviders, NgModule, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export function removeStyleTags(document: HTMLDocument, platformId: string): Function {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const dom = ɵgetDOM();

      const styles: HTMLElement[] = Array.prototype.slice.apply(dom.querySelectorAll(document, 'style[ng-transition]'));
      document.addEventListener('PrebootComplete', () => {
        setTimeout(() => styles.forEach(el => dom.remove(el)));
      });
    }
  };
}

@NgModule({})
export class ServerTransition {
  public static forRoot(param: { appId: string }): ModuleWithProviders {
    return {
      ngModule: ServerTransition,
      providers: [
        { provide: APP_ID, useValue: param.appId },
        { provide: ɵTRANSITION_ID, useValue: param.appId },
        {
          provide: APP_BOOTSTRAP_LISTENER,
          useFactory: removeStyleTags,
          deps: [DOCUMENT, PLATFORM_ID],
          multi: true
        }
      ]
    };
  }
}
