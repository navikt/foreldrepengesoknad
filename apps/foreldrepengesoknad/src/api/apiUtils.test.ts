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
    opprinneligUttaksplanInput: UttakPeriodeDto[] | null = [],
) => {
    const data: ContextDataMap = {
        [ContextDataType.ANNEN_FORELDER]: annenForelderInput,
        [ContextDataType.OM_BARNET]: barnInput,
        [ContextDataType.UTTAKSPLAN]: uttaksplanInput,
        [ContextDataType.OPPRINNELIG_UTTAKSPLAN]:
            opprinneligUttaksplanInput === null ? undefined : { saksnummer, perioder: opprinneligUttaksplanInput },
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

    it('skal berre inkludere søkers periodar i uttaksplanen', () => {
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

    it('skal sende hele planen med endringsdato', () => {
        const farsUttak: UttakPeriodeDto = {
            fom: '2024-03-01',
            tom: '2024-03-29',
            annenPart: { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false },
        };
        const nyePerioder: UttakPeriodeDto[] = [
            mor('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
            mor('2024-02-01', '2024-02-29', 'FELLESPERIODE'),
            farsUttak,
        ];
        const eksisterendePerioder: UttakPeriodeDto[] = [
            mor('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
            mor('2024-02-01', '2024-02-29', 'MØDREKVOTE'),
            farsUttak,
        ];
        const data = getStateMock(annenForelderMock, barnMock, nyePerioder, 'SAK-001', eksisterendePerioder);
        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.endringsdato).toBe('2024-02-01');
        expect(endringssøknad.uttaksplan.perioder).toEqual(nyePerioder);
    });

    it('skal fjerne søkerens avslåtte perioder når planen er uendret, fordi hele planen da sendes til fpsak', () => {
        const avslåttPeriode: UttakPeriodeDto = {
            fom: '2024-03-01',
            tom: '2024-03-29',
            søker: {
                forelder: 'MOR',
                kontoType: 'MØDREKVOTE',
                flerbarnsdager: false,
                resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
            },
        };
        const eøsPeriode: UttakPeriodeDto = {
            fom: '2024-04-01',
            tom: '2024-04-30',
            annenPartEøs: { kontoType: 'FEDREKVOTE', trekkdager: 20 },
        };
        const plan = [mor('2024-02-01', '2024-02-29', 'MØDREKVOTE'), avslåttPeriode, eøsPeriode];
        const data = getStateMock(annenForelderMock, barnMock, plan, 'SAK-001', plan);

        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.endringsdato).toBeUndefined();
        expect(endringssøknad.uttaksplan.perioder).toEqual([plan[0], eøsPeriode]);
    });

    it('skal fjerne søkerens avslåtte perioder fra og med endringsdato og beholde annen parts del', () => {
        const avslag = { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' } as const;
        const avslåttJanuar: UttakPeriodeDto = {
            fom: '2024-01-01',
            tom: '2024-01-31',
            søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false, resultat: avslag },
        };
        const farsDel = { forelder: 'FAR_MEDMOR', kontoType: 'FEDREKVOTE', flerbarnsdager: false } as const;
        const avslåttMarsMedFar: UttakPeriodeDto = {
            fom: '2024-03-01',
            tom: '2024-03-29',
            søker: { forelder: 'MOR', kontoType: 'FELLESPERIODE', flerbarnsdager: false, resultat: avslag },
            annenPart: farsDel,
        };
        const opprinneligPlan = [avslåttJanuar, mor('2024-02-01', '2024-02-29', 'MØDREKVOTE'), avslåttMarsMedFar];
        const nyPlan = [avslåttJanuar, mor('2024-02-01', '2024-02-29', 'FELLESPERIODE'), avslåttMarsMedFar];
        const data = getStateMock(annenForelderMock, barnMock, nyPlan, 'SAK-001', opprinneligPlan);

        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.endringsdato).toBe('2024-02-01');
        expect(endringssøknad.uttaksplan.perioder).toEqual([
            avslåttJanuar,
            nyPlan[1],
            { fom: '2024-03-01', tom: '2024-03-29', annenPart: farsDel },
        ]);
    });

    it('skal ikke legge inn fri utsettelse når søkeren har slettet perioder, fordi fp-soknad gjør det', () => {
        const annenPartsUtsettelse: UttakPeriodeDto = {
            fom: '2024-02-12',
            tom: '2024-02-29',
            annenPart: { forelder: 'FAR_MEDMOR', utsettelseÅrsak: 'FERIE', flerbarnsdager: false },
        };
        const opprinneligPlan = [
            mor('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
            mor('2024-02-01', '2024-02-09', 'MØDREKVOTE'),
            annenPartsUtsettelse,
            mor('2024-03-01', '2024-03-29', 'MØDREKVOTE'),
        ];
        const nyPlan = opprinneligPlan.filter((periode) => periode.fom !== '2024-02-01');
        const data = getStateMock(annenForelderMock, barnMock, nyPlan, 'SAK-001', opprinneligPlan);

        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.endringsdato).toBe('2024-02-01');
        expect(endringssøknad.uttaksplan.perioder).toEqual(nyPlan);
    });

    it('skal sende annen parts uttak uendret når søkeren har fjernet sin del av et samtidig uttak', () => {
        const farsDel = {
            forelder: 'FAR_MEDMOR',
            kontoType: 'FEDREKVOTE',
            samtidigUttak: 50,
            flerbarnsdager: false,
        } as const;
        const eksisterendePerioder: UttakPeriodeDto[] = [
            mor('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
            { ...mor('2024-02-01', '2024-02-29', 'FELLESPERIODE'), annenPart: farsDel },
            mor('2024-03-01', '2024-03-29', 'FELLESPERIODE'),
        ];
        const nyePerioder: UttakPeriodeDto[] = [
            mor('2024-01-01', '2024-01-31', 'MØDREKVOTE'),
            { fom: '2024-02-01', tom: '2024-02-29', annenPart: farsDel },
            mor('2024-03-01', '2024-03-29', 'FELLESPERIODE'),
        ];
        const data = getStateMock(annenForelderMock, barnMock, nyePerioder, 'SAK-001', eksisterendePerioder);
        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.endringsdato).toBe('2024-02-01');
        expect(endringssøknad.uttaksplan.perioder).toEqual(nyePerioder);
    });

    it('skal flytte endringsdato i helg til mandag uten å splitte perioden som krysser den', () => {
        const opprinneligPlan = [
            mor('2024-01-01', '2024-02-02', 'MØDREKVOTE'),
            mor('2024-02-05', '2024-02-16', 'FELLESPERIODE'),
        ];
        const nyPlan = [opprinneligPlan[0]!, mor('2024-02-03', '2024-02-16', 'FELLESPERIODE')];
        const data = getStateMock(annenForelderMock, barnMock, nyPlan, 'SAK-001', opprinneligPlan);

        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.endringsdato).toBe('2024-02-05');
        expect(endringssøknad.uttaksplan.perioder).toEqual(nyPlan);
    });

    it('skal fjerne søkerens avslåtte periode som krysser endringsdato, fordi fp-soknad kutter og sender den', () => {
        const avslåttPeriode: UttakPeriodeDto = {
            fom: '2024-02-03',
            tom: '2024-02-16',
            søker: {
                forelder: 'MOR',
                kontoType: 'FELLESPERIODE',
                flerbarnsdager: false,
                resultat: { innvilget: false, trekkerDager: true, trekkerMinsterett: false, årsak: 'ANNET' },
            },
        };
        const opprinneligPlan = [
            mor('2024-01-01', '2024-02-02', 'MØDREKVOTE'),
            mor('2024-02-05', '2024-02-16', 'FELLESPERIODE'),
        ];
        const nyPlan = [opprinneligPlan[0]!, avslåttPeriode];
        const data = getStateMock(annenForelderMock, barnMock, nyPlan, 'SAK-001', opprinneligPlan);

        const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

        expect(endringssøknad.endringsdato).toBe('2024-02-05');
        expect(endringssøknad.uttaksplan.perioder).toEqual([opprinneligPlan[0]]);
    });

    // Scenario fra produksjon: far tok perioden rundt fødsel med 100 % samtidig uttak. Endringstidspunktet
    // skal utledes fra brukerens faktiske endring og ikke flyttes tilbake til fødselen (som gjorde at
    // perioden fall ut på søknadsfrist i fpsak).
    describe('samtidig uttak rundt fødsel skal ikke regnes som brukerendring', () => {
        const opprinneligPlan: UttakPeriodeDto[] = [
            {
                fom: '2024-01-01',
                tom: '2024-01-12',
                søker: { forelder: 'MOR', flerbarnsdager: false, kontoType: 'MØDREKVOTE', samtidigUttak: 100 },
                annenPart: {
                    forelder: 'FAR_MEDMOR',
                    flerbarnsdager: false,
                    kontoType: 'FEDREKVOTE',
                    samtidigUttak: 100,
                },
            },
            mor('2024-01-15', '2024-03-29', 'MØDREKVOTE'),
            mor('2024-04-01', '2024-04-30', 'FELLESPERIODE'),
        ];

        it('skal utlede endringstidspunkt fra brukerens faktiske endring', () => {
            const nyPlan = opprinneligPlan.map((p) =>
                p.søker?.kontoType === 'FELLESPERIODE' ? { ...p, tom: '2024-05-31' } : p,
            );

            const data = getStateMock(annenForelderMock, barnMock, nyPlan, 'SAK-001', opprinneligPlan);
            const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

            expect(endringssøknad.endringsdato).toBe('2024-04-01');
            expect(endringssøknad.uttaksplan.perioder).toEqual(nyPlan);
        });

        it('skal ikke gi endringstidspunkt når planen er uendret', () => {
            expect(getEndringstidspunktNy(opprinneligPlan, opprinneligPlan)).toBeUndefined();
        });

        it('skal fremdeles fange opp at brukeren endrer samtidig uttak-perioden manuelt', () => {
            const nyPlan = opprinneligPlan.map((p) =>
                p.fom === '2024-01-01' ? { ...p, søker: { ...p.søker!, samtidigUttak: 50 } } : p,
            );

            const data = getStateMock(annenForelderMock, barnMock, nyPlan, 'SAK-001', opprinneligPlan);
            const endringssøknad = mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO);

            expect(endringssøknad.endringsdato).toBe('2024-01-01');
        });

        it('skal stoppe innsending når opprinnelig uttaksplan mangler', () => {
            const data = getStateMock(annenForelderMock, barnMock, opprinneligPlan, 'SAK-001', null);

            expect(() => mapTilEndringssøknadDto(data, DEFAULT_SØKER_INFO)).toThrow(
                'Mangler opprinnelig uttaksplan for endringssøknad',
            );
        });

        it('skal stoppe innsending når opprinnelig uttaksplan tilhører en annen sak', () => {
            const data: ContextDataMap = {
                [ContextDataType.ANNEN_FORELDER]: annenForelderMock,
                [ContextDataType.OM_BARNET]: barnMock,
                [ContextDataType.UTTAKSPLAN]: opprinneligPlan,
                [ContextDataType.OPPRINNELIG_UTTAKSPLAN]: {
                    saksnummer: 'ANNEN-SAK',
                    perioder: opprinneligPlan,
                },
                [ContextDataType.SØKERSITUASJON]: { rolle: 'mor', situasjon: 'fødsel' },
                [ContextDataType.VALGT_EKSISTERENDE_SAKSNR]: 'SAK-001',
            };
            const hentData = <TYPE extends ContextDataType>(type: TYPE): ContextDataMap[TYPE] => data[type];

            expect(() => mapTilEndringssøknadDto(hentData, DEFAULT_SØKER_INFO)).toThrow(
                'Opprinnelig uttaksplan tilhører ikke valgt sak',
            );
        });
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
