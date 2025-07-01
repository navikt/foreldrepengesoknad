import { Saker } from '@navikt/fp-types';

export const saker = {
    foreldrepenger: [
        {
            saksnummer: '352011594',
            sakAvsluttet: false,
            oppdatertTidspunkt: '2023-03-31',
            kanSøkeOmEndring: false,
            sakTilhørerMor: false,
            gjelderAdopsjon: true,
            morUføretrygd: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            ønskerJustertUttakVedFødsel: false,
            rettighetType: 'BEGGE_RETT',
            annenPart: {
                fnr: '05489305072',
            },
            familiehendelse: {
                fødselsdato: '2023-02-01',
                antallBarn: 1,
                omsorgsovertakelse: '2023-04-10',
            },
            åpenBehandling: {
                tilstand: 'VENT_INNTEKTSMELDING',
                søknadsperioder: [
                    {
                        fom: '2023-04-10',
                        tom: '2023-07-21',
                        kontoType: 'FEDREKVOTE',
                        flerbarnsdager: false,
                    },
                    {
                        fom: '2023-07-24',
                        tom: '2023-09-15',
                        kontoType: 'FELLESPERIODE',
                        morsAktivitet: 'UTDANNING',
                        flerbarnsdager: false,
                    },
                ],
            },
            barn: [],
            dekningsgrad: 'HUNDRE',
        },
    ],
    engangsstønad: [],
    svangerskapspenger: [],
} satisfies Saker;
