import { ContextDataType } from 'appData/FpDataContext';
import { dateToISOString } from 'utils/dateUtils';

import {
    AnnenForelder,
    Barn,
    BarnType,
    FødtBarn,
    Periode,
    PeriodeHull,
    Periodetype,
    Uttaksperiode,
} from '@navikt/fp-common';
import { ArbeidsforholdOgInntektFp, PersonMedArbeidsforholdDto_fpoversikt, Uttaksplanperiode } from '@navikt/fp-types';

import {
    cleanEndringssøknad,
    cleanSøknad,
    getPeriodeVedTidspunkt,
    getUttaksplanMedFriUtsettelsesperiode,
} from './apiUtils';

const DEFAULT_SØKER_INFO = {
    arbeidsforhold: [
        {
            arbeidsgiverId: '9903232324',
            arbeidsgiverIdType: 'ikke-orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            from: '2018-06-25T00:00:00.000Z',
            stillingsprosent: 80,
        },
        {
            arbeidsgiverId: '990322244',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
            from: '2017-04-05T00:00:00.000Z',
            stillingsprosent: 100,
        },
    ],
    person: {
        navn: {
            etternavn: 'Oravakangas',
            fornavn: 'Erlinga-Mask',
        },
        fnr: '02343434',
        fødselsdato: '1989-08-30',
        kjønn: 'K',
        barn: [],
    },
} satisfies PersonMedArbeidsforholdDto_fpoversikt;

const getAnnenForelderUførMock = (
    urUførInput: boolean | undefined,
    erForSykInput: boolean | undefined,
    datoForAleneomsorgInput: string | undefined,
): AnnenForelder => {
    return {
        fornavn: 'Mor',
        etternavn: 'Utvikler',
        erMorUfør: urUførInput,
        erForSyk: erForSykInput,
        kanIkkeOppgis: false,
        datoForAleneomsorg: datoForAleneomsorgInput,
    };
};

const getAnnenForelderMock = (): AnnenForelder => {
    return {
        fornavn: 'Mor',
        etternavn: 'UtenUførInfo',
        kanIkkeOppgis: false,
    };
};

const getAnnenForelderIkkeOppgittMock = (): AnnenForelder => {
    return {
        kanIkkeOppgis: true,
    };
};

const getBarnMock = () => {
    return {
        type: BarnType.FØDT,
        fødselsdatoer: ['2022-01-01'],
        termindato: '2022-02-01',
        fnr: ['01010111111'],
        antallBarn: 1,
    } satisfies FødtBarn;
};

// TODO (TOR) Dette er midlertidig logikk
const getStateMock = (annenForelderInput: AnnenForelder, barnInput: Barn, uttaksplanInput: Periode[]) => {
    return (type: ContextDataType): any => {
        if (type === ContextDataType.ANNEN_FORELDER) {
            return annenForelderInput;
        }
        if (type === ContextDataType.OM_BARNET) {
            return barnInput;
        }
        if (type === ContextDataType.UTTAKSPLAN) {
            return uttaksplanInput;
        }
        if (type === ContextDataType.UTENLANDSOPPHOLD) {
            return {
                harBoddUtenforNorgeSiste12Mnd: false,
                skalBoUtenforNorgeNeste12Mnd: false,
            };
        }
        if (type === ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE) {
            return [];
        }
        if (type === ContextDataType.UTENLANDSOPPHOLD_SENERE) {
            return [];
        }
        if (type === ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT) {
            return {
                harHattAndreInntektskilder: false,
                harJobbetSomFrilans: false,
                harJobbetSomSelvstendigNæringsdrivende: false,
            } satisfies ArbeidsforholdOgInntektFp;
        }
        if (type === ContextDataType.SØKERSITUASJON) {
            return {
                rolle: 'mor',
                situasjon: 'fødsel',
            };
        }

        return {};
    };
};

describe('cleanUpSøknadsdataForInnsending', () => {
    const barnMock = getBarnMock();
    const fødselsdato = barnMock.fødselsdatoer[0];
    const annenForelderMock = getAnnenForelderUførMock(true, false, '2021-01-01');
    const dataFelles = getStateMock(annenForelderMock, barnMock, []);

    const cleanedSøknad = cleanSøknad(dataFelles, fødselsdato, DEFAULT_SØKER_INFO);

    it('skal fjerne input om annenForelder.erForSyk fra søknad for innsending', () => {
        if (!cleanedSøknad.annenForelder) {
            throw new Error('Annen forelder finnes ikke i cleanedSøknad');
        }
        expect(Object.hasOwn(cleanedSøknad.annenForelder, 'erForSyk')).toBe(false);
    });

    it('skal ikke feile for ikke oppgitt forelder', () => {
        const data = getStateMock(getAnnenForelderIkkeOppgittMock(), barnMock, []);

        const cleanedSøknadUtenForelder = cleanSøknad(data, fødselsdato, DEFAULT_SØKER_INFO);
        expect(cleanedSøknadUtenForelder.annenForelder).toBe(undefined);
    });

    it('skal ikke feile når ingen input om erUfør eller erForSyk på annenForelder', () => {
        const annenForelderUtenUførInfo = getAnnenForelderMock();
        const data = getStateMock(annenForelderUtenUførInfo, barnMock, []);

        const cleanedSøknadUtenUførInfo = cleanSøknad(data, fødselsdato, DEFAULT_SØKER_INFO);
        if (!cleanedSøknadUtenUførInfo.annenForelder) {
            throw new Error('Annen forelder finnes ikke i cleanedSøknadUtenUførInfo');
        }
        expect(Object.hasOwn(cleanedSøknadUtenUførInfo.annenForelder, 'erUfør')).toBe(false);
    });

    it('skal sende at annenforelder er informert for endringssøknad', () => {
        const annenForelder = { ...getAnnenForelderMock(), harRettPåForeldrepengerINorge: true };
        const data = getStateMock(annenForelder, barnMock, []);

        const cleanedSøknadMedRett = cleanEndringssøknad(data, [], fødselsdato, DEFAULT_SØKER_INFO);
        expect(cleanedSøknadMedRett.annenForelder).toBeDefined();
        expect(cleanedSøknadMedRett.annenForelder?.rettigheter.erInformertOmSøknaden).toBe(true);
    });

    it('skal sende undefined for om annenforelder er informert hvis annen part ikke har rett', () => {
        const annenForelder = { ...getAnnenForelderMock(), harRettPåForeldrepengerINorge: false };
        const data = getStateMock(annenForelder, barnMock, []);

        const cleanedSøknadUtenRett = cleanSøknad(data, fødselsdato, DEFAULT_SØKER_INFO);
        expect(cleanedSøknadUtenRett.annenForelder).toBeDefined();
        expect(cleanedSøknadUtenRett.annenForelder?.rettigheter.erInformertOmSøknaden).toBe(undefined);
    });

    it('skal fjerne info om erMorForSyk fra periodene men ikke endre resten av uttaksplanen', () => {
        const periodeUttak = {
            id: '0',
            type: Periodetype.Uttak,
            erMorForSyk: true,
            konto: 'FELLESPERIODE',
            samtidigUttakProsent: undefined,
            tidsperiode: { fom: new Date('2021-01-01'), tom: new Date('2021-01-03') },
            forelder: 'FAR_MEDMOR',
        } satisfies Uttaksperiode;
        const periodeHull = {
            id: '1',
            type: Periodetype.Hull,
            tidsperiode: { fom: new Date('2021-01-04'), tom: new Date('2021-01-11') },
        } satisfies PeriodeHull;
        const data = getStateMock(annenForelderMock, barnMock, [periodeUttak, periodeHull]);

        const cleanedSøknadUtenUførInfo = cleanSøknad(data, fødselsdato, DEFAULT_SØKER_INFO);
        expect(cleanedSøknadUtenUførInfo.uttaksplan.uttaksperioder.length).toBe(1);
        const uttaksperiodeInnsending = cleanedSøknadUtenUførInfo.uttaksplan.uttaksperioder[0];
        if (uttaksperiodeInnsending.type !== 'uttak') {
            throw new Error('type er ikke uttak');
        }
        expect(Object.hasOwn(uttaksperiodeInnsending, 'erMorForSyk')).toBe(false);
        expect(uttaksperiodeInnsending.type).toBe(Periodetype.Uttak);
        expect(uttaksperiodeInnsending.fom).toBe(dateToISOString(periodeUttak.tidsperiode.fom));
        expect(uttaksperiodeInnsending.tom).toBe(dateToISOString(periodeUttak.tidsperiode.tom));
        expect(uttaksperiodeInnsending.konto).toBe('FELLESPERIODE');
    });
    it('skal fjerne periode uten konto', () => {
        const periodeUttakUtenKonto = {
            id: '0',
            type: Periodetype.Uttak,
            erMorForSyk: true,
            tidsperiode: { fom: new Date('2021-01-01'), tom: new Date('2021-01-03') },
            forelder: 'MOR',
            konto: 'MØDREKVOTE',
        } satisfies Uttaksperiode;

        const data = getStateMock(annenForelderMock, barnMock, [periodeUttakUtenKonto]);

        const cleanedSøknadUtenUførInfo = cleanSøknad(data, fødselsdato, DEFAULT_SØKER_INFO);
        expect(cleanedSøknadUtenUførInfo.uttaksplan.uttaksperioder.length).toBe(0);
    });

    it('skal fjerne datoForAleneomsorg, type og fnr fra født barn objektet og beholde fødsel og termindato', () => {
        const barn = cleanedSøknad.barn;
        if (barn.type !== 'fødsel') {
            throw new Error('type er ikke fødsel');
        }
        expect(Object.hasOwn(barn, 'datoForAleneomsorg')).toBe(false);
        expect(Object.hasOwn(barn, 'fnr')).toBe(false);
        expect(barn.type).toEqual('fødsel');
        expect(barn.fødselsdato).toEqual(barnMock.fødselsdatoer[0]);
        expect(barn.termindato).toEqual(barnMock.termindato);
    });

    it('skal konvertere rolle til upper case', () => {
        expect(cleanedSøknad.rolle).toEqual('MOR');
    });

    it('skal ikke ha søkersituasjon objektet ved innsending', () => {
        expect(Object.hasOwn(cleanedSøknad, 'søkersituasjon')).toBe(false);
    });
});

//Periode 1:
const fraDato_1 = '2022-01-25';
const tilDato_1 = '2022-01-28';
const periode_1 = {
    type: Periodetype.Uttak,
    konto: 'FELLESPERIODE',
    fom: fraDato_1,
    tom: tilDato_1,
} satisfies Uttaksplanperiode;

//Periode 2:
const fraDato_2 = '2022-01-31';
const tilDato_2 = '2022-02-07';
const periode_2 = {
    type: Periodetype.Uttak,
    konto: 'FELLESPERIODE',
    fom: fraDato_2,
    tom: tilDato_2,
} satisfies Uttaksplanperiode;

//Periode 3: (1 dag)
const fraDato_3 = '2022-02-11';
const tilDato_3 = '2022-02-11';
const periode_3 = {
    type: Periodetype.Uttak,
    konto: 'FELLESPERIODE',
    fom: fraDato_3,
    tom: tilDato_3,
} satisfies Uttaksplanperiode;

//Periode 4:
const fraDato_4 = '2022-02-14';
const tilDato_4 = '2022-02-24';
const periode_4 = {
    type: Periodetype.Uttak,
    konto: 'FELLESPERIODE',
    fom: fraDato_4,
    tom: tilDato_4,
} satisfies Uttaksplanperiode;

//Periode 5: 28.02, 1 dag, ikke skuddår
const fraDato_5 = '2022-02-28';
const tilDato_5 = '2022-02-28';
const periode_5 = {
    type: Periodetype.Uttak,
    konto: 'FELLESPERIODE',
    fom: fraDato_5,
    tom: tilDato_5,
} satisfies Uttaksplanperiode;

//Periode 6: 1.03, ikke skuddår
const fraDato_6 = '2022-03-01';
const tilDato_6 = '2022-03-07';
const periode_6 = {
    type: Periodetype.Uttak,
    konto: 'FELLESPERIODE',
    fom: fraDato_6,
    tom: tilDato_6,
} satisfies Uttaksplanperiode;

//Periode 7: 1.03 i et skuddår
const fraDato_7 = '2024-03-01';
const tilDato_7 = '2024-03-07';
const periode_7 = {
    type: Periodetype.Uttak,
    konto: 'FELLESPERIODE',
    fom: fraDato_7,
    tom: tilDato_7,
} satisfies Uttaksplanperiode;

const uttaksplanMedAllePerioder: Uttaksplanperiode[] = [
    periode_1,
    periode_2,
    periode_3,
    periode_4,
    periode_5,
    periode_6,
    periode_7,
];

const getUttaksplanUtenPeriode = (removePeriode: Uttaksplanperiode): Uttaksplanperiode[] => {
    return uttaksplanMedAllePerioder.filter((periode) => periode !== removePeriode);
};

const uttaksplanUtenPeriode_1 = getUttaksplanUtenPeriode(periode_1);
const uttaksplanUtenPeriode_2 = getUttaksplanUtenPeriode(periode_2);
const uttaksplanUtenPeriode_3 = getUttaksplanUtenPeriode(periode_3);
const uttaksplanUtenPeriode_5 = getUttaksplanUtenPeriode(periode_5);

describe('getUttaksplanMedFriUtsettelsesperiode', () => {
    it('inserts correct fri utsettelsesperiode that ends on a Friday', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_1, new Date(fraDato_1));
        const friUtsettelsePeriode = nyUttaksplan[0];
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_1);
        expect(friUtsettelsePeriode.tom).toEqual(tilDato_1);
    });
    it('inserts correct fri utsettelsesperiode and fills out hole before next periode', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_2, new Date(fraDato_2));
        const friUtsettelsePeriode = nyUttaksplan[1];
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_2);
        expect(friUtsettelsePeriode.tom).toEqual('2022-02-10');
    });
    it('inserts correct fri utsettelsesperiode that lasts 1 day', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_3, new Date(fraDato_3));
        const friUtsettelsePeriode = nyUttaksplan[2];
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_3);
        expect(friUtsettelsePeriode.tom).toEqual(tilDato_3);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in a non-leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_5, new Date(fraDato_5));
        const friUtsettelsePeriode = nyUttaksplan[4];
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_5);
        expect(friUtsettelsePeriode.tom).toEqual(tilDato_5);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(
            [...uttaksplanMedAllePerioder],
            new Date('2024-02-27'),
        );
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[6];
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.fom).toEqual('2024-02-27');
        expect(friUtsettelsePeriode.tom).toEqual('2024-02-29');
    });

    it('inserts correct fri utsettelsesperiode that ends at endringstidspunkt if no periods after', () => {
        const endringstidspunkt = '2024-03-08';
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(
            [...uttaksplanMedAllePerioder],
            new Date(endringstidspunkt),
        );
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[7];
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.fom).toEqual(endringstidspunkt);
        expect(friUtsettelsePeriode.tom).toEqual(endringstidspunkt);
    });
});

describe('getPeriodeVedTidspunkt', () => {
    it('returns correct periode that overlaps at tidspunkt', () => {
        const periode = getPeriodeVedTidspunkt(uttaksplanMedAllePerioder, new Date(fraDato_2));
        expect(periode).toEqual(periode_2);
    });

    it('returns undefined when no periode overlaps at tidspunkt', () => {
        const periodeNotFound = getPeriodeVedTidspunkt(uttaksplanMedAllePerioder, new Date('2024-03-08'));
        expect(periodeNotFound).toBe(undefined);
    });
});
