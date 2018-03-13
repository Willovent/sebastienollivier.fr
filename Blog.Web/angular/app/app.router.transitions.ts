import { trigger, animate, style, group, animateChild, query, stagger, transition } from '@angular/animations';

const smoothTransition = [
  group([
    query(':enter app-scroll-container', [
      style({ transform: 'translate(10vh,20vw)', opacity: 0 }),
      animate('.5s ease-in-out', style({ transform: 'translate(0,0)', opacity: 1 }))
    ], { optional: true }),
    query(':leave app-scroll-container', [
      style({ transform: 'translate(0,0)', opacity: 1 }),
      animate('.5s ease-in-out', style({ transform: 'translate(10vh,20vw)', opacity: 0 }))
    ], { optional: true }),
  ])
];

export const routerTransition = trigger('routerTransition', [
  transition('home => post', smoothTransition),
  transition('post => home', smoothTransition)
]);
