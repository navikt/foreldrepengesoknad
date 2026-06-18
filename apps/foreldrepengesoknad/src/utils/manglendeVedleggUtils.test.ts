import { AnnenForelder } from 'types/AnnenForelder';

import { UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { perioderSomKreverVedlegg } from './manglendeVedleggUtils';

const annenForelder = {
    fornavn: 'Far',
    etternavn: 'Forelder',
    fnr: '12345678901',
    harRettPåForeldrepengerINorge: true,
    erAleneOmOmsorg: false,
    kanIkkeOppgis: false,
} satisfies AnnenForelder;

const familiehendelsedato = '2024-01-01';

const lagFellesperiodeMedMorsAktivitet = (forelder: 'MOR' | 'FAR_MEDMOR'): UttakPeriode_fpoversikt => ({
    forelder,
    kontoType: 'FELLESPERIODE',
    fom: '2024-06-01',
    tom: '2024-06-30',
    morsAktivitet: 'ARBEID',
    samtidigUttak: 50,
    flerbarnsdager: false,
});

describe('perioderSomKreverVedlegg - dokumentasjon av mors aktivitet', () => {
    it('skal ikke kreve dokumentasjon for mors aktivitet i mors egen søknad ved samtidig uttak av fellesperiode', () => {
        const perioder = perioderSomKreverVedlegg(
            [lagFellesperiodeMedMorsAktivitet('MOR')],
            false,
            annenForelder,
            familiehendelsedato,
        );

        expect(perioder).toHaveLength(0);
    });

    it('skal fortsatt kreve dokumentasjon for mors aktivitet i far/medmor sin søknad', () => {
        const perioder = perioderSomKreverVedlegg(
            [lagFellesperiodeMedMorsAktivitet('FAR_MEDMOR')],
            true,
            annenForelder,
            familiehendelsedato,
        );

        expect(perioder).toHaveLength(1);
    });
});
