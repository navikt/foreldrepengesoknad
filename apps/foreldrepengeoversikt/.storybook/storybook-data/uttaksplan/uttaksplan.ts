import { FellesUttaksplanDto, FpSak_fpoversikt, Saker_fpoversikt } from '@navikt/fp-types';

const innvilget = {
    innvilget: true,
    trekkerMinsterett: true,
    trekkerDager: true,
    årsak: 'ANNET',
} as const;

export const uttaksplan = {
    antallBarn: 1,
    dekningsgrad: 'HUNDRE',
    termindato: '2022-07-01',
    perioder: [
        {
            fom: '2022-06-10',
            tom: '2022-06-30',
            søker: {
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2022-07-01',
            tom: '2022-08-11',
            søker: {
                kontoType: 'MØDREKVOTE',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2022-08-12',
            tom: '2022-10-13',
            søker: {
                kontoType: 'MØDREKVOTE',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
            },
        },
        {
            fom: '2022-10-14',
            tom: '2022-12-21',
            søker: {
                kontoType: 'FELLESPERIODE',
                resultat: innvilget,
                flerbarnsdager: false,
                forelder: 'MOR',
                samtidigUttak: 50,
            },
        },
        {
            fom: '2023-03-12',
            tom: '2023-03-26',
            annenPart: {
                kontoType: 'FEDREKVOTE',
                samtidigUttak: 100,
                resultat: {
                    innvilget: true,
                    trekkerMinsterett: false,
                    trekkerDager: true,
                    årsak: 'ANNET',
                },
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        },
    ],
} satisfies FellesUttaksplanDto;

// Lager en enkel felles uttaksplan med søkerens perioder fra saken, slik backend gjør når
// annen part ikke har vedtak: perioder fra gjeldende vedtak, ellers fra søknaden under behandling.
export const lagFellesUttaksplanFraSak = (sak: FpSak_fpoversikt): FellesUttaksplanDto => {
    const perioder = sak.gjeldendeVedtak?.perioder ?? sak.åpenBehandling?.søknadsperioder ?? [];
    return {
        antallBarn: sak.familiehendelse.antallBarn,
        dekningsgrad: sak.dekningsgrad ?? 'HUNDRE',
        termindato: sak.familiehendelse.termindato,
        perioder: perioder.map((periode) => ({
            fom: periode.fom,
            tom: periode.tom,
            søker: {
                flerbarnsdager: periode.flerbarnsdager,
                forelder: periode.forelder,
                kontoType: periode.kontoType,
                resultat: periode.resultat,
                samtidigUttak: periode.samtidigUttak,
            },
        })),
    };
};

export const lagFellesUttaksplanForSaksnummer = (saker: Saker_fpoversikt, saksnummer: string) => {
    const sak = saker.foreldrepenger.find((s) => s.saksnummer === saksnummer);
    return sak ? lagFellesUttaksplanFraSak(sak) : null;
};
