import { SøknadRoutes } from 'appData/routes';

import { VERSJON_MELLOMLAGRING, shouldApplyStorage } from './mellomlagringUtils';

describe('Test av mellomlagring', () => {
    it('Burde ikke bruke mellomlagrede data hvis versjon ikke er lik current version', () => {
        const result = shouldApplyStorage({
            version: 3,
        });

        expect(result).toBe(false);
    });

    it('Burde bruke mellomlagrede data hvis versjon er lik current version', () => {
        const result = shouldApplyStorage({ version: VERSJON_MELLOMLAGRING });

        expect(result).toBe(true);
    });

    it('Burde bruke førstegangssøknad uten opprinnelig uttaksplan', () => {
        const result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            erEndringssøknad: false,
        });

        expect(result).toBe(true);
    });

    it('Burde ikke bruke endringssøknad uten opprinnelig uttaksplan', () => {
        const result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            erEndringssøknad: true,
            APP_ROUTE: SøknadRoutes.UTTAKSPLAN,
        });

        expect(result).toBe(false);
    });

    it('Burde bruke endringssøknad med opprinnelig uttaksplan', () => {
        const result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            erEndringssøknad: true,
            APP_ROUTE: SøknadRoutes.OPPSUMMERING,
            OPPRINNELIG_UTTAKSPLAN: {
                saksnummer: 'SAK-001',
                perioder: [],
            },
        });

        expect(result).toBe(true);
    });

    it('Burde ikke bruke mellomlagrede data hvis currentRoute er en rute som ikke finnes for endringssøknad', () => {
        let result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.SØKERSITUASJON,
            erEndringssøknad: true,
        });

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.OM_BARNET,
            erEndringssøknad: true,
        });

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.ANNEN_FORELDER,
            erEndringssøknad: true,
        });

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.FORDELING,
            erEndringssøknad: true,
        });

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.UTENLANDSOPPHOLD,
            erEndringssøknad: true,
        });

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.ARBEID_OG_INNTEKT,
            erEndringssøknad: true,
        });

        expect(result).toBe(false);
    });
});
