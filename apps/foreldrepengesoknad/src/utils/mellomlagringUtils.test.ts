import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

import { VERSJON_MELLOMLAGRING, shouldApplyStorage } from './mellomlagringUtils';

describe('Test av mellomlagring', () => {
    it('Burde ikke bruke mellomlagrede data hvis versjon ikke er lik current version', () => {
        const result = shouldApplyStorage({
            version: 3,
        } as FpMellomlagretData);

        expect(result).toBe(false);
    });

    it('Burde bruke mellomlagrede data hvis versjon er lik current version', () => {
        const result = shouldApplyStorage({ version: VERSJON_MELLOMLAGRING } as FpMellomlagretData);

        expect(result).toBe(true);
    });

    it('Burde ikke bruke mellomlagrede data hvis currentRoute er en rute som ikke finnes for endringssøknad', () => {
        let result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.SØKERSITUASJON,
            erEndringssøknad: true,
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.OM_BARNET,
            erEndringssøknad: true,
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.ANNEN_FORELDER,
            erEndringssøknad: true,
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.FORDELING,
            erEndringssøknad: true,
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.UTENLANDSOPPHOLD,
            erEndringssøknad: true,
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            APP_ROUTE: SøknadRoutes.ARBEID_OG_INNTEKT,
            erEndringssøknad: true,
        } as FpMellomlagretData);

        expect(result).toBe(false);
    });
});
