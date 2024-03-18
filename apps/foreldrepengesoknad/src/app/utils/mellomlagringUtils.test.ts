import { FpMellomlagretData } from 'app/api/api';
import SøknadRoutes from 'app/routes/routes';

import { MELLOMLAGRET_VERSJON, shouldApplyStorage } from './mellomlagringUtils';

describe('Test av mellomlagring', () => {
    it('Burde ikke bruke mellomlagrede data hvis versjon ikke er lik current version', () => {
        const result = shouldApplyStorage({
            version: 3,
            søknad: {},
        } as FpMellomlagretData);

        expect(result).toBe(false);
    });

    it('Burde bruke mellomlagrede data hvis versjon er lik current version', () => {
        const result = shouldApplyStorage({ version: MELLOMLAGRET_VERSJON, søknad: {} } as FpMellomlagretData);

        expect(result).toBe(true);
    });

    it('Burde ikke bruke mellomlagrede data hvis currentRoute er en rute som ikke finnes for endringssøknad', () => {
        let result = shouldApplyStorage({
            version: MELLOMLAGRET_VERSJON,
            currentRoute: SøknadRoutes.SØKERSITUASJON,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: MELLOMLAGRET_VERSJON,
            currentRoute: SøknadRoutes.OM_BARNET,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: MELLOMLAGRET_VERSJON,
            currentRoute: SøknadRoutes.ANNEN_FORELDER,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: MELLOMLAGRET_VERSJON,
            currentRoute: SøknadRoutes.FORDELING,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: MELLOMLAGRET_VERSJON,
            currentRoute: SøknadRoutes.UTENLANDSOPPHOLD,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);

        result = shouldApplyStorage({
            version: MELLOMLAGRET_VERSJON,
            currentRoute: SøknadRoutes.INNTEKTSINFORMASJON,
            søknad: {
                erEndringssøknad: true,
            },
        } as FpMellomlagretData);

        expect(result).toBe(false);
    });
});
