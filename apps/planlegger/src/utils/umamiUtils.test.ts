import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { loggExpansionCardOpen, loggExpansionCardToggle } from './umamiUtils';

describe('sporing av utvidbare kort', () => {
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

    it('skal skille åpning og lukking med samme faste komponent-ID', () => {
        const loggToggle = loggExpansionCardToggle('oppsummering-oppgitt-informasjon');

        loggToggle(true);
        loggToggle(false);

        expect(analytics.mock.calls).toEqual([
            [
                {
                    origin: 'planlegger',
                    eventName: 'utvidbart kort åpnet',
                    eventData: { tittel: 'Oppgitt informasjon', komponentId: 'oppsummering-oppgitt-informasjon' },
                },
            ],
            [
                {
                    origin: 'planlegger',
                    eventName: 'utvidbart kort lukket',
                    eventData: { tittel: 'Oppgitt informasjon', komponentId: 'oppsummering-oppgitt-informasjon' },
                },
            ],
        ]);
    });

    it('skal fortsatt bare logge åpning for kort uten lukkesporing', () => {
        const loggOpen = loggExpansionCardOpen('toggle-tilpasse-planen');

        loggOpen(false);
        loggOpen(true);

        expect(analytics).toHaveBeenCalledExactlyOnceWith({
            origin: 'planlegger',
            eventName: 'utvidbart kort åpnet',
            eventData: { tittel: 'Tilpasse planen', komponentId: 'toggle-tilpasse-planen' },
        });
    });
});
