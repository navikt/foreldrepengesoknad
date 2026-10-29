import { SøknadRoutes } from 'appData/routes';
import type { FpMellomlagretData } from 'appData/useMellomlagreSøknad';

import type { UttakPeriodeDto } from '@navikt/fp-types';

import {
    VERSJON_MELLOMLAGRING,
    fjernAnnetGraderingsaktivitet,
    fjernAnnetGraderingsaktivitetFraMellomlagring,
    shouldApplyStorage,
} from './mellomlagringUtils';

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

    it.each([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.DOKUMENTASJON, SøknadRoutes.OPPSUMMERING])(
        'skal ikke gjenoppta endringssøknad på %s uten opprinnelig uttaksplan',
        (route) => {
            const result = shouldApplyStorage({
                version: VERSJON_MELLOMLAGRING,
                erEndringssøknad: true,
                APP_ROUTE: route,
            });

            expect(result).toBe(false);
        },
    );

    it.each([SøknadRoutes.UTTAKSPLAN, SøknadRoutes.DOKUMENTASJON, SøknadRoutes.OPPSUMMERING])(
        'skal gjenoppta endringssøknad på %s med opprinnelig uttaksplan',
        (route) => {
            const result = shouldApplyStorage({
                version: VERSJON_MELLOMLAGRING,
                erEndringssøknad: true,
                APP_ROUTE: route,
                OPPRINNELIG_UTTAKSPLAN: {
                    saksnummer: 'SAK-001',
                    perioder: [],
                },
            });

            expect(result).toBe(true);
        },
    );

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

describe('fjernAnnetGraderingsaktivitet', () => {
    const lagPeriode = (aktivitet?: { type: string; arbeidsgiver?: { id: string } }) =>
        ({
            fom: '2024-01-01',
            tom: '2024-01-31',
            søker: {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                gradering: { arbeidstidprosent: 50, ...(aktivitet && { aktivitet }) },
            },
            annenPart: {
                forelder: 'FAR_MEDMOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                samtidigUttak: 50,
                gradering: { arbeidstidprosent: 50, ...(aktivitet && { aktivitet }) },
            },
        }) as UttakPeriodeDto;

    it('skal fjerne aktivitet ANNET for både søker og annen part', () => {
        const [periode] = fjernAnnetGraderingsaktivitet([lagPeriode({ type: 'ANNET' })]);

        expect(periode).toEqual(lagPeriode());
        expect(periode?.søker?.gradering).not.toHaveProperty('aktivitet');
        expect(periode?.annenPart?.gradering).not.toHaveProperty('aktivitet');
    });

    it('skal ikkje endre andre aktivitetar', () => {
        const periode = lagPeriode({ type: 'ORDINÆRT_ARBEID', arbeidsgiver: { id: '123456789' } });

        expect(fjernAnnetGraderingsaktivitet([periode])[0]).toBe(periode);
    });

    it('skal ikkje endre periodar utan gradering', () => {
        const periode = { fom: '2024-01-01', tom: '2024-01-31' } as UttakPeriodeDto;

        expect(fjernAnnetGraderingsaktivitet([periode])[0]).toBe(periode);
    });

    it('skal fjerne ANNET i uttaksplan, opprinneleg uttaksplan og fellesUttaksplan i mellomlagra data', () => {
        const data = {
            version: VERSJON_MELLOMLAGRING,
            UTTAKSPLAN: [lagPeriode({ type: 'ANNET' })],
            OPPRINNELIG_UTTAKSPLAN: { saksnummer: 'SAK-001', perioder: [lagPeriode({ type: 'ANNET' })] },
            fellesUttaksplan: { antallBarn: 1, dekningsgrad: 'HUNDRE', perioder: [lagPeriode({ type: 'ANNET' })] },
        } as unknown as FpMellomlagretData;

        const resultat = fjernAnnetGraderingsaktivitetFraMellomlagring(data);

        expect(resultat.UTTAKSPLAN).toEqual([lagPeriode()]);
        expect(resultat.OPPRINNELIG_UTTAKSPLAN?.perioder).toEqual([lagPeriode()]);
        expect(resultat.fellesUttaksplan?.perioder).toEqual([lagPeriode()]);
        expect(resultat.version).toBe(VERSJON_MELLOMLAGRING);
    });

    it('skal ikkje leggje til felt som manglar i mellomlagra data', () => {
        const data = { version: VERSJON_MELLOMLAGRING } as FpMellomlagretData;

        expect(fjernAnnetGraderingsaktivitetFraMellomlagring(data)).toEqual(data);
    });
});
