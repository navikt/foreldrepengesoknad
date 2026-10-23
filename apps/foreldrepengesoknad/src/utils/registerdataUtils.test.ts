import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt } from '@navikt/fp-types';
import { omitMany } from '@navikt/fp-utils';

import { erSakerEndret, erSøkerInfoEndret } from './registerdataUtils';

const uttakPeriode = {
    fom: '2024-01-01',
    tom: '2024-01-31',
    kontoType: 'MØDREKVOTE',
    flerbarnsdager: false,
    forelder: 'MOR',
} as const;

const sak: FpSak_fpoversikt = {
    saksnummer: '352011594',
    sakAvsluttet: false,
    oppdatertTidspunkt: '2024-01-01',
    kanSøkeOmEndring: true,
    forelder: 'MOR',
    sakTilhørerMor: true,
    gjelderAdopsjon: false,
    morUføretrygd: false,
    harAnnenForelderTilsvarendeRettEØS: false,
    rettighetType: 'BEGGE_RETT',
    dekningsgrad: 'HUNDRE',
    annenPart: { fnr: '05489305072' },
    familiehendelse: { fødselsdato: '2024-01-01', antallBarn: 1 },
    gjeldendeVedtak: {
        perioder: [uttakPeriode],
        perioderAnnenpartEøs: [],
    },
    åpenBehandling: {
        tilstand: 'UNDER_BEHANDLING',
        søknadsperioder: [uttakPeriode],
    },
};

const søkerInfo: FpPersonopplysningerDto_fpoversikt = {
    fnr: '19047815714',
    fødselsdato: '1978-04-19',
    kjønn: 'K',
    navn: { fornavn: 'Kari', etternavn: 'Nordmann' },
    erGift: false,
    barn: [],
    arbeidsforhold: [],
    frilansoppdrag: [],
    selvstendigNæring: [],
};

describe('erSakerEndret', () => {
    it('er ikke endret når sakene er like', () => {
        expect(erSakerEndret([sak], [{ ...sak }])).toBe(false);
    });

    it('ignorerer perioder i vedtak og åpen behandling, som dekkes av fellesUttaksplan', () => {
        const fersk: FpSak_fpoversikt = {
            ...sak,
            gjeldendeVedtak: { perioder: [], perioderAnnenpartEøs: undefined },
            åpenBehandling: { tilstand: 'VENT_INNTEKTSMELDING', søknadsperioder: [] },
        };
        expect(erSakerEndret([sak], [fersk])).toBe(false);
    });

    it('ignorerer at backend fjerner et felt som søknaden ikke bruker', () => {
        const ferskUtenUbrukteFelt = {
            ...omitMany(sak, ['oppdatertTidspunkt', 'forelder', 'åpenBehandling']),
            gjeldendeVedtak: {},
        } as FpSak_fpoversikt;

        expect(erSakerEndret([sak], [ferskUtenUbrukteFelt])).toBe(false);
    });

    it('ignorerer at backend legger til et nytt felt', () => {
        const ferskMedNyttFelt = { ...sak, nyttFeltFraBackend: 'verdi' } as FpSak_fpoversikt;
        expect(erSakerEndret([sak], [ferskMedNyttFelt])).toBe(false);
    });

    it('er endret når et relevant felt endres', () => {
        expect(erSakerEndret([sak], [{ ...sak, dekningsgrad: 'ÅTTI' }])).toBe(true);
        expect(erSakerEndret([sak], [{ ...sak, familiehendelse: { ...sak.familiehendelse, antallBarn: 2 } }])).toBe(
            true,
        );
        expect(erSakerEndret([sak], [{ ...sak, kanSøkeOmEndring: false }])).toBe(true);
    });

    it('er endret når saken får eller mister gjeldende vedtak', () => {
        expect(erSakerEndret([sak], [{ ...sak, gjeldendeVedtak: undefined }])).toBe(true);
    });

    it('er endret når en sak kommer til eller forsvinner', () => {
        expect(erSakerEndret([sak], [sak, { ...sak, saksnummer: '1' }])).toBe(true);
        expect(erSakerEndret([sak], [])).toBe(true);
    });

    it('er ikke endret når bare rekkefølgen på sakene er annerledes', () => {
        const annenSak = { ...sak, saksnummer: '1' };
        expect(erSakerEndret([sak, annenSak], [annenSak, sak])).toBe(false);
    });
});

describe('erSøkerInfoEndret', () => {
    it('er ikke endret når søkerinfo er lik', () => {
        expect(erSøkerInfoEndret(søkerInfo, { ...søkerInfo })).toBe(false);
    });

    it('ignorerer at backend legger til et nytt felt', () => {
        const fersk = { ...søkerInfo, nyttFeltFraBackend: true } as FpPersonopplysningerDto_fpoversikt;
        expect(erSøkerInfoEndret(søkerInfo, fersk)).toBe(false);
    });

    it('ignorerer at lagret søkerinfo mangler frilansoppdrag og selvstendigNæring', () => {
        const lagret = omitMany(søkerInfo, [
            'frilansoppdrag',
            'selvstendigNæring',
        ]) as FpPersonopplysningerDto_fpoversikt;
        expect(erSøkerInfoEndret(lagret, søkerInfo)).toBe(false);
    });

    it('er endret når et relevant felt endres', () => {
        expect(erSøkerInfoEndret(søkerInfo, { ...søkerInfo, erGift: true })).toBe(true);
        expect(
            erSøkerInfoEndret(søkerInfo, {
                ...søkerInfo,
                arbeidsforhold: [
                    {
                        arbeidsgiverId: '123',
                        arbeidsgiverIdType: 'orgnr',
                        arbeidsgiverNavn: 'Firma',
                        fom: '2020-01-01',
                        stillingsprosent: 100,
                    },
                ],
            }),
        ).toBe(true);
    });
});
