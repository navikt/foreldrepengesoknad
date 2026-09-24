import { AnnenForelder } from 'types/AnnenForelder';

import { PeriodeDto_fpoversikt, VedtattResultat_fpoversikt } from '@navikt/fp-types';

import { finnPerioderSomInngårISøknaden, perioderSomKreverVedlegg } from './manglendeVedleggUtils';

const annenForelder = {
    fornavn: 'Far',
    etternavn: 'Forelder',
    fnr: '12345678901',
    harRettPåForeldrepengerINorge: true,
    erAleneOmOmsorg: false,
    kanIkkeOppgis: false,
} satisfies AnnenForelder;

const familiehendelsedato = '2024-01-01';

const lagFellesperiodeMedMorsAktivitet = (forelder: 'MOR' | 'FAR_MEDMOR'): PeriodeDto_fpoversikt => ({
    fom: '2024-06-01',
    tom: '2024-06-30',
    søker: {
        forelder,
        kontoType: 'FELLESPERIODE',
        morsAktivitet: 'ARBEID',
        samtidigUttak: 50,
        flerbarnsdager: false,
    },
});

const innvilgetResultat: VedtattResultat_fpoversikt = {
    innvilget: true,
    trekkerDager: true,
    trekkerMinsterett: false,
    årsak: 'ANNET',
};

const innvilgetFellesperiodeMorSyk: PeriodeDto_fpoversikt = {
    fom: '2024-01-01',
    tom: '2024-01-31',
    søker: {
        flerbarnsdager: false,
        forelder: 'FAR_MEDMOR',
        kontoType: 'FELLESPERIODE',
        morsAktivitet: 'TRENGER_HJELP',
        resultat: innvilgetResultat,
    },
};

const nyFellesperiodeMorJobber: PeriodeDto_fpoversikt = {
    fom: '2024-02-01',
    tom: '2024-02-28',
    søker: {
        flerbarnsdager: false,
        forelder: 'FAR_MEDMOR',
        kontoType: 'FELLESPERIODE',
        morsAktivitet: 'ARBEID',
    },
};

const morsPeriode: PeriodeDto_fpoversikt = {
    fom: '2023-12-01',
    tom: '2023-12-31',
    annenPart: {
        flerbarnsdager: false,
        forelder: 'MOR',
        kontoType: 'MØDREKVOTE',
    },
};

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

describe('finnPerioderSomInngårISøknaden', () => {
    it('utelater allerede innvilgede perioder i en endringssøknad mot en eksisterende sak', () => {
        const resultat = finnPerioderSomInngårISøknaden([innvilgetFellesperiodeMorSyk, nyFellesperiodeMorJobber], true);

        expect(resultat).toEqual([nyFellesperiodeMorJobber]);
    });

    it('beholder alle søkerens perioder i en førstegangssøknad uten eksisterende sak', () => {
        const periodeUtenResultat: PeriodeDto_fpoversikt = {
            ...nyFellesperiodeMorJobber,
            søker: { ...nyFellesperiodeMorJobber.søker!, morsAktivitet: 'TRENGER_HJELP' },
        };

        const resultat = finnPerioderSomInngårISøknaden([periodeUtenResultat, nyFellesperiodeMorJobber], false);

        expect(resultat).toEqual([periodeUtenResultat, nyFellesperiodeMorJobber]);
    });

    it('filtrerer bort annen parts perioder', () => {
        const resultat = finnPerioderSomInngårISøknaden([morsPeriode, nyFellesperiodeMorJobber], false);

        expect(resultat).toEqual([nyFellesperiodeMorJobber]);
    });
});
