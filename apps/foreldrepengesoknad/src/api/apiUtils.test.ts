import { ContextDataMap, ContextDataType } from 'appData/FpDataContext';
import { AnnenForelder } from 'types/AnnenForelder';
import { getEndringstidspunktNy } from 'utils/dateUtils';

import { BarnType } from '@navikt/fp-constants';
import { Barn, FpPersonopplysningerDto_fpoversikt, FødtBarn, UttakPeriodeDto } from '@navikt/fp-types';

import { mapTilEndringssøknadDto, mapTilSøknadDto } from './apiUtils';

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
    frilansoppdrag: [],
    kjønn: 'K',
    navn: {
        etternavn: 'Oravakangas',
        fornavn: 'Erlinga-Mask',
    },
    selvstendigNæring: [],
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
    uttaksplanInput: UttakPeriodeDto[],
    saksnummer = 'SAK-001',
) => {
    const data: ContextDataMap = {
        [ContextDataType.ANNEN_FORELDER]: annenForelderInput,
        [ContextDataType.OM_BARNET]: barnInput,
        [ContextDataType.UTTAKSPLAN]: uttaksplanInput,
        [ContextDataType.SØKERSITUASJON]: { rolle: 'mor', situasjon: 'fødsel' },
        [ContextDataType.PERIODE_MED_FORELDREPENGER]: '100',
        [ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL]: false,
        [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: saksnummer,
        [ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE]: [],
        [ContextDataType.UTENLANDSOPPHOLD_SENERE]: [],
    };
    return <TYPE extends ContextDataType>(type: TYPE): ContextDataMap[TYPE] => data[type];
};

const mor = (
    fom: string,
    tom: string,
    kontoType: 'MØDREKVOTE' | 'FELLESPERIODE' | 'FEDREKVOTE' | 'FORELDREPENGER',
): UttakPeriodeDto => ({
    fom,
    tom,
    søker: {
        forelder: 'MOR',
        flerbarnsdager: false,
        kontoType,
    },
});

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

    it('skal sende hele uttaksplanen i perioder', () => {
        const morsUttak: UttakPeriodeDto = {
            fom: '2021-01-01',
            tom: '2021-01-10',
            søker: {
                forelder: 'MOR',
                flerbarnsdager: false,
                kontoType: 'MØDREKVOTE',
            },
        };
        const farsUttak: UttakPeriodeDto = {
            fom: '2021-01-11',
            tom: '2021-01-20',
            annenPart: {
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
                kontoType: 'FEDREKVOTE',
            },
        };
        const data = getStateMock(annenForelderMock, barnMock, [morsUttak, farsUttak]);
        const søknadMedPerioder = mapTilSøknadDto(data, DEFAULT_SØKER_INFO);
        expect(søknadMedPerioder.uttaksplan.perioder).toEqual([morsUttak, farsUttak]);
        expect(Object.hasOwn(søknadMedPerioder.uttaksplan, 'uttaksperioder')).toBe(false);
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

    it('skal sende hele uttaksplanen i perioder, også annen parts perioder og avslag', () => {
        const farsUttak: UttakPeriodeDto = {
            fom: '2024-03-01',
            tom: '2024-03-29',
            annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
        };
        const avslåttPeriode: UttakPeriodeDto = {
            fom: '2024-04-01',
            tom: '2024-04-30',
            søker: {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
            },
        };
        const nyePerioder: UttakPeriodeDto[] = [
            mor('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
            mor('2024-02-01', '2024-02-29', 'FELLESPERIODE'),
            farsUttak,
            avslåttPeriode,
        ];
        const data = getStateMock(annenForelderMock, barnMock, nyePerioder);
        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.uttaksplan.perioder).toEqual(nyePerioder);
        expect(Object.hasOwn(endringssøknad.uttaksplan, 'uttaksperioder')).toBe(false);
    });
});

const lagUttakPeriode = (
    fom: string,
    tom: string,
    kontoType: 'MØDREKVOTE' | 'FELLESPERIODE' | 'FEDREKVOTE' | 'FORELDREPENGER' = 'MØDREKVOTE',
): UttakPeriodeDto => mor(fom, tom, kontoType);

describe('getEndringstidspunktNy - endringstidspunkt for endringssøknad', () => {
    describe('skal finne korrekt endringstidspunkt med 3+ periodar', () => {
        it('skal returnere endringstidspunkt når ein periode i midten er endra og det finst periodar etter', () => {
            const opprinneligPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'FELLESPERIODE'), // endra kontoType
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);

            expect(result).toBe('2024-02-01');
        });

        it('skal returnere endringstidspunkt når første periode er endra og det finst periodar etter', () => {
            const opprinneligPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'FELLESPERIODE'), // endra
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-01-01');
        });

        it('skal returnere endringstidspunkt når ny periode er lagt til mellom eksisterande periodar', () => {
            const opprinneligPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'FELLESPERIODE'), // ny periode
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-02-01');
        });

        it('skal returnere endringstidspunkt når periode i midten av 4 periodar er endra', () => {
            const opprinneligPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-04-01', '2024-04-30', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriodeDto[] = [
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
            const opprinneligPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'FELLESPERIODE'), // endra
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-02-01');
        });

        it('skal returnere endringstidspunkt når siste av tre periodar er endra', () => {
            const opprinneligPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'FELLESPERIODE'), // endra siste
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-03-01');
        });

        it('skal returnere undefined når planane er identiske', () => {
            const plan: UttakPeriodeDto[] = [
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
            const opprinneligPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
            ];

            const oppdatertPlan: UttakPeriodeDto[] = [
                lagUttakPeriode('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
                lagUttakPeriode('2024-03-01', '2024-03-29', 'MØDREKVOTE'), // feb er fjerna
            ];

            const result = getEndringstidspunktNy(opprinneligPlan, oppdatertPlan);
            expect(result).toBe('2024-02-01');
        });
    });
});
