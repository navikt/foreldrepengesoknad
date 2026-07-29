// Laster inn StoryContext.msw-augmenteringen fra msw-storybook-addon slik at
// `beforeEach({ msw })` i stories får riktig type. Augmenteringen ligger i
// «/types»-eksporten, som ikke trekkes inn av «/csf3»-importen i preview-filene.
import type {} from 'msw-storybook-addon/types';
