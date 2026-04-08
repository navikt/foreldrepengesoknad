import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

import { VERSJON_MELLOMLAGRING, shouldApplyStorage } from './mellomlagringUtils';

describe('Test av mellomlagring', () => {
    it('Burde ikke bruke mellomlagrede data hvis versjon ikke er lik current version', () => {
        const result = shouldApplyStorage({
            version: 3,
            søknad: {},
        } as FpMellomlagretData);

        expect(result).toBe(false);
    });

    it('Burde bruke mellomlagrede data hvis versjon er lik current version', () => {
        const result = shouldApplyStorage({ version: VERSJON_MELLOMLAGRING, søknad: {} } as FpMellomlagretData);

        expect(result).toBe(true);
    });

    it('Burde ikke bruke mellomlagrede data hvis currentRoute er en rute som ikke finnes for endringssøknad', () => {
        let result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            currentRoute: SøknadRoutes.SØKERSITUASJON,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            currentRoute: SøknadRoutes.OM_BARNET,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            currentRoute: SøknadRoutes.ANNEN_FORELDER,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            currentRoute: SøknadRoutes.FORDELING,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            currentRoute: SøknadRoutes.UTENLANDSOPPHOLD,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: VERSJON_MELLOMLAGRING,
            currentRoute: SøknadRoutes.ARBEID_OG_INNTEKT,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);
    });
});
