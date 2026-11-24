import { pushEvent, pushMeasurement } from '@nais/apm';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { initFaro } from './initFaro';

const DATA_MARKØR = 'SYNTETISK_DATA_MARKOR';
const PLANLEGGER_MARKØR = 'SYNTETISK_PLANLEGGERDATA_MARKOR';
const FRAGMENT_MARKØR = 'SYNTETISK_FRAGMENT_MARKOR';

const fetchMock = vi.fn<(url: string, init?: RequestInit) => Promise<Response>>(() =>
    Promise.resolve(new Response(null, { status: 202 })),
);

const sendteBodies = () => fetchMock.mock.calls.map(([, init]) => (typeof init?.body === 'string' ? init.body : ''));

const hentSendteBodies = async (forventetInnhold: string): Promise<string[]> => {
    await vi.waitFor(() => {
        expect(sendteBodies().join('\n---\n')).toContain(forventetInnhold);
    }, 5000);
    return sendteBodies();
};

const navigerTil = (url: string) => {
    const fraUrl = location.href;
    history.pushState({}, '', url);
    return { fraUrl, tilUrl: location.href };
};

describe('initFaro – utgående telemetri', () => {
    beforeAll(() => {
        const meta = document.createElement('meta');
        meta.name = 'nais-telemetry-url';
        meta.content = 'https://telemetry.test/collect';
        document.head.appendChild(meta);
        vi.stubGlobal('fetch', fetchMock);

        history.replaceState({}, '', `/planlegger/oppsummering?data=${DATA_MARKØR}#${FRAGMENT_MARKØR}`);
        initFaro();
    });

    beforeEach(() => {
        fetchMock.mockClear();
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    it('sender rute uten søkestreng og fragment i page.url', async () => {
        pushEvent('hendelse-før-navigasjon');

        const bodies = await hentSendteBodies('hendelse-før-navigasjon');

        expect(bodies.join()).not.toContain(DATA_MARKØR);
        expect(bodies.join()).not.toContain(FRAGMENT_MARKØR);
        const body = JSON.parse(bodies.find((b) => b.includes('hendelse-før-navigasjon'))!);
        expect(body.meta.page.url).toBe(`${location.origin}/planlegger/oppsummering`);
    });

    it('sender rute uten søkestreng og fragment etter navigasjon, også i URL-felt i navigasjonshendelser', async () => {
        const { fraUrl, tilUrl } = navigerTil(
            `/foreldrepengesoknad/velkommen?planleggerData=${PLANLEGGER_MARKØR}#${FRAGMENT_MARKØR}`,
        );
        expect(tilUrl).toContain(PLANLEGGER_MARKØR);

        // Samme form som Faros navigasjons- og performance-instrumentering sender
        pushEvent('faro.navigation', { fromUrl: fraUrl, toUrl: tilUrl, sameDocument: 'true' });
        pushEvent('faro.performance.navigation', { name: tilUrl, type: 'navigate' });
        pushMeasurement('web-vitals', { lcp: 1 }, { context: { resource_url: tilUrl } });
        pushEvent('hendelse-etter-navigasjon');

        const bodies = await hentSendteBodies('hendelse-etter-navigasjon');
        const alt = bodies.join();

        expect(alt).toContain('faro.navigation');
        expect(alt).toContain('faro.performance.navigation');
        expect(alt).not.toContain(DATA_MARKØR);
        expect(alt).not.toContain(PLANLEGGER_MARKØR);
        expect(alt).not.toContain(FRAGMENT_MARKØR);

        const body = JSON.parse(bodies.find((b) => b.includes('hendelse-etter-navigasjon'))!);
        expect(body.meta.page.url).toBe(`${location.origin}/foreldrepengesoknad/velkommen`);
        expect(alt).toContain(`"fromUrl":"${location.origin}/planlegger/oppsummering"`);
        expect(alt).toContain(`"toUrl":"${location.origin}/foreldrepengesoknad/velkommen"`);
    });
});
