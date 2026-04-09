import { ContextDataType } from 'appData/FpDataContext';
import { getEndringstidspunktNy } from 'utils/dateUtils';

import { AnnenForelder, Barn, BarnType, FødtBarn, Periodetype } from '@navikt/fp-common';
import {
    FpPersonopplysningerDto_fpoversikt,
    FpSak_fpoversikt,
    UttakPeriode_fpoversikt,
    Uttaksplanperiode,
} from '@navikt/fp-types';

import {
    getPeriodeVedTidspunkt,
    getUttaksplanMedFriUtsettelsesperiode,
    mapTilEndringssøknadDto,
    mapTilSøknadDto,
} from './apiUtils';

const DEFAULT_SØKER_INFO = {
    arbeidsforhold: [
        {
            arbeidsgiverId: '9903232324',
            arbeidsgiverIdType: 'ikke-orgnr',
            arbeidsgiverNavn: 'Sykehuset i Vestfold',
            fom: '2018-06-25T00:00:00.000Z',
            stillingsprosent: 80,
        },
        {
            arbeidsgiverId: '990322244',
            arbeidsgiverIdType: 'orgnr',
            arbeidsgiverNavn: 'Omsorgspartner Vestfold AS',
            fom: '2017-04-05T00:00:00.000Z',
            stillingsprosent: 100,
        },
    ],
    barn: [],
    erGift: false,
    fnr: '02343434',
    fødselsdato: '1989-08-30',
    kjønn: 'K',
    navn: {
        etternavn: 'Oravakangas',
        fornavn: 'Erlinga-Mask',
    },
} satisfies FpPersonopplysningerDto_fpoversikt;

const getAnnenForelderUførMock = (
    erUførInput: boolean | undefined,
    erForSykInput: boolean | undefined,
    datoForAleneomsorgInput: string | undefined,
): AnnenForelder => {
    return {
        fnr: '1',
        erAleneOmOmsorg: false,
        fornavn: 'Mor',
        etternavn: 'Utvikler',
        erMorUfør: erUførInput,
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
        fnr: '1',
        erAleneOmOmsorg: false,
        erMorUfør: false,
        erForSyk: false,
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

const getStateMock = (
    annenForelderInput: AnnenForelder,
    barnInput: Barn,
    uttaksplanInput: UttakPeriode_fpoversikt[],
    saksnummer = 'SAK-001',
) => {
    return (type: ContextDataType): any => {
        if (type === ContextDataType.ANNEN_FORELDER) {
            return annenForelderInput;
        }
        if (type === ContextDataType.OM_BARNET) {
            return barnInput;
        }
        if (type === ContextDataType.UTTAKSPLAN_NY) {
            return uttaksplanInput;
        }
        if (type === ContextDataType.SØKERSITUASJON) {
            return { rolle: 'mor', situasjon: 'fødsel' };
        }
        if (type === ContextDataType.PERIODE_MED_FORELDREPENGER) {
            return '100';
        }
        if (type === ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL) {
            return false;
        }
        if (type === ContextDataType.VALGT_EKSISTERENDE_SAKSNR) {
            return saksnummer;
        }
        if (type === ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE) {
            return [];
        }
        if (type === ContextDataType.UTENLANDSOPPHOLD_SENERE) {
            return [];
        }
        return undefined;
    };
};

describe('mapTilSøknadDto', () => {
    const barnMock = getBarnMock();
    const annenForelderMock = getAnnenForelderUførMock(true, false, '2021-01-01');
    const dataFelles = getStateMock(annenForelderMock, barnMock, []);

    const søknad = mapTilSøknadDto(dataFelles, DEFAULT_SØKER_INFO);

    it('skal ikkje ha erForSyk i annenForelder i søknaden', () => {
        expect(søknad.annenForelder).toBeDefined();
        expect(Object.hasOwn(søknad.annenForelder!, 'erForSyk')).toBe(false);
    });

    it('skal returnere undefined for annenForelder som ikkje er oppgitt', () => {
        const data = getStateMock(getAnnenForelderIkkeOppgittMock(), barnMock, []);
        const søknadUtenForelder = mapTilSøknadDto(data, DEFAULT_SØKER_INFO);
        expect(søknadUtenForelder.annenForelder).toBe(undefined);
    });

    it('skal ikkje ha erUfør i annenForelder i søknaden', () => {
        const data = getStateMock(getAnnenForelderMock(), barnMock, []);
        const søknadUtenUførInfo = mapTilSøknadDto(data, DEFAULT_SØKER_INFO);
        expect(søknadUtenUførInfo.annenForelder).toBeDefined();
        expect(Object.hasOwn(søknadUtenUførInfo.annenForelder!, 'erUfør')).toBe(false);
    });

    it('skal sette erInformertOmSøknaden=undefined når annen part ikkje har rett', () => {
        const annenForelder = { ...getAnnenForelderMock(), harRettPåForeldrepengerINorge: false };
        const data = getStateMock(annenForelder, barnMock, []);
        const søknadUtenRett = mapTilSøknadDto(data, DEFAULT_SØKER_INFO);
        expect(søknadUtenRett.annenForelder).toBeDefined();
        expect(søknadUtenRett.annenForelder?.rettigheter.erInformertOmSøknaden).toBe(undefined);
    });

    it('skal mappe barn korrekt (type, fødselsdato, termindato)', () => {
        const barn = søknad.barn;
        if (barn.type !== 'fødsel') {
            throw new Error('type er ikkje fødsel');
        }
        expect(Object.hasOwn(barn, 'fnr')).toBe(false);
        expect(barn.type).toEqual('fødsel');
        expect(barn.fødselsdato).toEqual(barnMock.fødselsdatoer[0]);
        expect(barn.termindato).toEqual(barnMock.termindato);
    });

    it('skal konvertere rolle til upper case', () => {
        expect(søknad.rolle).toEqual('MOR');
    });

    it('skal ikkje ha søkersituasjon i søknaden', () => {
        expect(Object.hasOwn(søknad, 'søkersituasjon')).toBe(false);
    });

    it('skal berre inkludere søkers periodar i uttaksplanen', () => {
        const morsUttak: UttakPeriode_fpoversikt = {
            fom: '2021-01-01',
            tom: '2021-01-10',
            forelder: 'MOR',
            flerbarnsdager: false,
            kontoType: 'MØDREKVOTE',
        };
        const farsUttak: UttakPeriode_fpoversikt = {
            fom: '2021-01-11',
            tom: '2021-01-20',
            forelder: 'FAR_MEDMOR',
            flerbarnsdager: false,
            kontoType: 'FEDREKVOTE',
        };
        const data = getStateMock(annenForelderMock, barnMock, [morsUttak, farsUttak]);
        const søknadMedPerioder = mapTilSøknadDto(data, DEFAULT_SØKER_INFO);
        expect(søknadMedPerioder.uttaksplan.uttaksperioder.length).toBe(1);
        expect(søknadMedPerioder.uttaksplan.uttaksperioder[0]!.fom).toBe('2021-01-01');
    });

    it('skal inkludere dekningsgrad og ønskerJustertUttakVedFødsel', () => {
        expect(søknad.dekningsgrad).toBe('100');
        expect(søknad.uttaksplan.ønskerJustertUttakVedFødsel).toBe(false);
    });
});

describe('mapTilEndringssøknadDto', () => {
    const barnMock = getBarnMock();
    const annenForelderMock = getAnnenForelderMock();

    it('skal sette erInformertOmSøknaden=true for endringssøknad når annen part har rett', () => {
        const annenForelder = { ...annenForelderMock, harRettPåForeldrepengerINorge: true };
        const data = getStateMock(annenForelder, barnMock, []);
        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);
        expect(endringssøknad.annenForelder).toBeDefined();
        expect(endringssøknad.annenForelder?.rettigheter.erInformertOmSøknaden).toBe(true);
    });

    it('skal inkludere saksnummer frå konteksten', () => {
        const data = getStateMock(annenForelderMock, barnMock, [], 'SAK-123');
        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);
        expect(endringssøknad.saksnummer).toBe('SAK-123');
    });

    it('skal berre inkludere periodar frå og med endringstidspunktet', () => {
        const nyePerioder: UttakPeriode_fpoversikt[] = [
            { fom: '2024-01-01', tom: '2024-01-31', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
            {
                fom: '2024-02-01',
                tom: '2024-02-29',
                forelder: 'MOR',
                flerbarnsdager: false,
                kontoType: 'FELLESPERIODE',
            },
            { fom: '2024-03-01', tom: '2024-03-29', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
        ];
        const eksisterendePerioder: UttakPeriode_fpoversikt[] = [
            { fom: '2024-01-01', tom: '2024-01-31', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
            { fom: '2024-02-01', tom: '2024-02-29', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
            { fom: '2024-03-01', tom: '2024-03-29', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
        ];
        const eksisterendeSak = {
            gjeldendeVedtak: { perioder: eksisterendePerioder },
        } as unknown as FpSak_fpoversikt;

        const data = getStateMock(annenForelderMock, barnMock, nyePerioder);
        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO, eksisterendeSak);

        // Endringstidspunktet er 2024-02-01 (første avvik), så berre perioder f.o.m. den datoen
        expect(endringssøknad.uttaksplan.uttaksperioder.length).toBe(2);
        expect(endringssøknad.uttaksplan.uttaksperioder[0]!.fom).toBe('2024-02-01');
    });

    it('skal leggje til FRI utsettelsesperiode ved gap på endringstidspunktet', () => {
        const nyePerioder: UttakPeriode_fpoversikt[] = [
            { fom: '2024-01-01', tom: '2024-01-31', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
            // gap: 2024-02-01 til 2024-02-29 er fjerna
            { fom: '2024-03-01', tom: '2024-03-29', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
        ];
        const eksisterendePerioder: UttakPeriode_fpoversikt[] = [
            { fom: '2024-01-01', tom: '2024-01-31', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
            { fom: '2024-02-01', tom: '2024-02-29', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
            { fom: '2024-03-01', tom: '2024-03-29', forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE' },
        ];
        const eksisterendeSak = {
            gjeldendeVedtak: { perioder: eksisterendePerioder },
        } as unknown as FpSak_fpoversikt;

        const data = getStateMock(annenForelderMock, barnMock, nyePerioder);
        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO, eksisterendeSak);

        // Endringstidspunkt er 2024-02-01, inga periode dekkjer den datoen → FRI utsettelse leggjast til
        const perioder = endringssøknad.uttaksplan.uttaksperioder;
        const friPeriode = perioder.find((p) => p.type === 'utsettelse');
        expect(friPeriode).toBeDefined();
        expect(friPeriode!.fom).toBe('2024-02-01');
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
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_1, fraDato_1);
        const friUtsettelsePeriode = nyUttaksplan[0]!;
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_1);
        expect(friUtsettelsePeriode.tom).toEqual(tilDato_1);
    });
    it('inserts correct fri utsettelsesperiode and fills out hole before next periode', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_2, fraDato_2);
        const friUtsettelsePeriode = nyUttaksplan[1]!;
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_2);
        expect(friUtsettelsePeriode.tom).toEqual('2022-02-10');
    });
    it('inserts correct fri utsettelsesperiode that lasts 1 day', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_3, fraDato_3);
        const friUtsettelsePeriode = nyUttaksplan[2]!;
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_3);
        expect(friUtsettelsePeriode.tom).toEqual(tilDato_3);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in a non-leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode(uttaksplanUtenPeriode_5, fraDato_5);
        const friUtsettelsePeriode = nyUttaksplan[4]!;
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length);
        expect(friUtsettelsePeriode.fom).toEqual(fraDato_5);
        expect(friUtsettelsePeriode.tom).toEqual(tilDato_5);
    });

    it('inserts correct fri utsettelsesperiode that ends last day of February in leap year', () => {
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode([...uttaksplanMedAllePerioder], '2024-02-27');
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[6]!;
        expect(friUtsettelsePeriode.type).toBe(Periodetype.Utsettelse);
        expect(friUtsettelsePeriode.fom).toEqual('2024-02-27');
        expect(friUtsettelsePeriode.tom).toEqual('2024-02-29');
    });

    it('inserts correct fri utsettelsesperiode that ends at endringstidspunkt if no periods after', () => {
        const endringstidspunkt = '2024-03-08';
        const nyUttaksplan = getUttaksplanMedFriUtsettelsesperiode([...uttaksplanMedAllePerioder], endringstidspunkt);
        expect(nyUttaksplan.length).toEqual(uttaksplanMedAllePerioder.length + 1);
        const friUtsettelsePeriode = nyUttaksplan[7]!;
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

// Hjelpefunksjon for å lage UttakPeriode_fpoversikt til testane
const lagUttakPeriode = (
    fom: string,
    tom: string,
    kontoType: 'MØDREKVOTE' | 'FELLESPERIODE' | 'FEDREKVOTE' | 'FORELDREPENGER' = 'MØDREKVOTE',
    forelder: 'MOR' | 'FAR_MEDMOR' = 'MOR',
): UttakPeriode_fpoversikt => ({
    fom,
    tom,
    forelder,
    flerbarnsdager: false,
    kontoType,
});

describe('getEndringstidspunktNy - endringstidspunkt for endringssøknad', () => {
    describe('skal finne korrekt endringstidspunkt med 3+ periodar', () => {
        it('skal returnere endringstidspunkt når ein periode i midten er endra og det finst periodar etter', () => {
            const opprinneligPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'FELLESPERIODE'), // endra kontoType
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);

            expect(result).toBe('2024-02-01');
        });

        it('skal returnere endringstidspunkt når første periode er endra og det finst periodar etter', () => {
            const opprinneligPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'FELLESPERIODE'), // endra
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-01-01');
        });

        it('skal returnere endringstidspunkt når ny periode er lagt til mellom eksisterande periodar', () => {
            const opprinneligPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'FELLESPERIODE'), // ny periode
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-02-01');
        });

        it('skal returnere endringstidspunkt når periode i midten av 4 periodar er endra', () => {
            const opprinneligPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-04-01', '2024-04-30', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'FELLESPERIODE'), // endra
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-04-01', '2024-04-30', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);

            expect(result).toBe('2024-02-01');
        });
    });

    describe('kontrolltestar - scenario som fungerer korrekt', () => {
        it('skal returnere endringstidspunkt når siste av to periodar er endra', () => {
            const opprinneligPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'FELLESPERIODE'), // endra
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-02-01');
        });

        it('skal returnere endringstidspunkt når siste av tre periodar er endra', () => {
            const opprinneligPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'FELLESPERIODE'), // endra siste
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-03-01');
        });

        it('skal returnere undefined når planane er identiske', () => {
            const plan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(
                plan,
                plan.map((p) => ({ ...p })),
            );
            expect(result).toBeUndefined();
        });

        it('skal returnere endringstidspunkt når ein periode er fjerna frå opprinnelig plan', () => {
            const opprinneligPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriode_fpoversikt[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'), // feb er fjerna
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-02-01');
        });
    });
});
