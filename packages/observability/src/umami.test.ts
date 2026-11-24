import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from 'vitest';

import { loggUmamiEvent } from './umami';

describe('loggUmamiEvent', () => {
    const analytics = vi.fn().mockResolvedValue(undefined);

    beforeEach(() => {
        analytics.mockClear();
        vi.stubEnv('MODE', 'production');
        vi.stubGlobal('dekoratorenAnalytics', analytics);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
    });

    it('skal sende standardhendelsen én gang med typede metadata', () => {
        loggUmamiEvent({
            origin: 'planlegger',
            eventName: 'fane byttet',
            eventData: { tilFane: 'liste', antallFaner: 2, selectionFollowsFocus: false },
        });

        expect(analytics).toHaveBeenCalledExactlyOnceWith({
            origin: 'planlegger',
            eventName: 'fane byttet',
            eventData: { tilFane: 'liste', antallFaner: 2, selectionFollowsFocus: false },
        });
    });

    it('skal beholde egne domenehendelser med og uten metadata', () => {
        loggUmamiEvent({ origin: 'foreldrepengesoknad', eventName: 'skjema fortsett senere' });
        loggUmamiEvent({
            origin: 'foreldrepengesoknad',
            eventName: 'uttaksplan endret',
            eventData: { visning: 'kalender' },
        });

        expect(analytics.mock.calls).toEqual([
            [{ origin: 'foreldrepengesoknad', eventName: 'skjema fortsett senere', eventData: undefined }],
            [{ origin: 'foreldrepengesoknad', eventName: 'uttaksplan endret', eventData: { visning: 'kalender' } }],
        ]);
    });

    it('skal ikke sende hendelser utenfor produksjon', () => {
        vi.stubEnv('MODE', 'development');

        loggUmamiEvent({ origin: 'planlegger', eventName: 'kopier-lenke' });

        expect(analytics).not.toHaveBeenCalled();
    });

    it('skal ikke feile når Dekoratørens logger mangler', () => {
        vi.stubGlobal('dekoratorenAnalytics', undefined);

        expect(() => loggUmamiEvent({ origin: 'planlegger', eventName: 'kopier-lenke' })).not.toThrow();
        expect(analytics).not.toHaveBeenCalled();
    });
});

// Disse kontraktene kontrolleres av TypeScript, ikke av Vitest ved runtime.
type Event = Parameters<typeof loggUmamiEvent>[0];

expectTypeOf<{ origin: 'planlegger'; eventName: 'besøk' }>().not.toExtend<Event>();
expectTypeOf<{
    origin: 'planlegger';
    eventName: 'besøk';
    eventData: { tittel: string };
}>().not.toExtend<Event>();
expectTypeOf<{
    origin: 'planlegger';
    eventName: 'knapp klikket';
    eventData: { tilFane: string };
}>().not.toExtend<Event>();
expectTypeOf<{ origin: 'planlegger'; eventName: 'tab klikk' }>().not.toExtend<Event>();
expectTypeOf<{
    origin: 'planlegger';
    eventName: 'besøk';
    eventData: { sidetittel: string };
}>().toExtend<Event>();
