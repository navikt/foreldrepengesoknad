import userEvent from '@testing-library/user-event';

// Storybook sin `enhanceContext` (køyrer i `Story.run()`) byter ut HTMLElement.prototype.focus
// med ein accessor der gettaren les `this.ownerDocument`. Når user-event sin `patchFocus`
// seinare gjer `const { focus, blur } = HTMLElement.prototype`, blir gettaren kalla med sjølve
// prototypen som receiver. Prototypen er ingen gyldig Node, så oppslaget kastar
// «TypeError: Illegal invocation», og testen feilar på første userEvent-kall etter `run()`.
//
// Storybook gjer denne patchen berre når `navigator.clipboard` finst. I jsdom er clipboard
// undefined, så patchen blir hoppa over, og difor feilar dette kun i browser-mode.
//
// Ved å køyre user-event sin patch før første `Story.run()` blir den interne patched-guarden
// sett. Alle seinare `patchFocus`-kall returnerer då med ein gong, og prototypen blir aldri
// lesen på nytt. Guarden blir aldri fjerna, sidan user-event berre kallar `restoreFocus`
// eksplisitt (aldri frå `setup()`).
userEvent.setup();
