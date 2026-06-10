import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { initFaro } from './initFaro';

vi.mock('@grafana/faro-web-sdk', () => ({
    initializeFaro: vi.fn(),
    getWebInstrumentations: vi.fn(() => []),
}));

const APP = { name: 'engangsstonad', namespace: 'teamforeldrepenger', version: '1.2.3' };

describe('initFaro', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
        vi.unstubAllGlobals();
        vi.clearAllMocks();
    });

    it('bruker prod-collector i prod-miljø (www.nav.no)', () => {
        vi.stubGlobal('location', { hostname: 'www.nav.no' });

        initFaro({ app: APP });

        expect(initializeFaro).toHaveBeenCalledTimes(1);
        expect(getWebInstrumentations).toHaveBeenCalled();
        expect(initializeFaro).toHaveBeenCalledWith(
            expect.objectContaining({
                url: 'https://telemetry.nav.no/collect',
                app: APP,
                paused: false,
            }),
        );
    });

    it('bruker dev-collector i dev-miljø (www.intern.dev.nav.no)', () => {
        vi.stubGlobal('location', { hostname: 'www.intern.dev.nav.no' });

        initFaro({ app: APP });

        expect(initializeFaro).toHaveBeenCalledWith(
            expect.objectContaining({
                url: 'https://telemetry.ekstern.dev.nav.no/collect',
                paused: false,
            }),
        );
    });

    it('pauser telemetri på localhost', () => {
        vi.stubGlobal('location', { hostname: 'localhost' });

        initFaro({ app: APP });

        expect(initializeFaro).toHaveBeenCalledWith(expect.objectContaining({ paused: true }));
    });

    it('hopper over initialisering i development-modus', () => {
        vi.stubEnv('MODE', 'development');
        vi.stubGlobal('location', { hostname: 'localhost' });

        initFaro({ app: APP });

        expect(initializeFaro).not.toHaveBeenCalled();
    });
});
