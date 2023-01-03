import { DekningsgradDTO } from 'app/types/DekningsgradDTO';
import { Sak } from 'app/types/Sak';
import { SaksperiodeDTO } from 'app/types/SaksperiodeDTO';
import { UttakArbeidType } from 'app/types/UttakArbeidType';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import {
    getArbeidsformFromUttakArbeidstype,
    mapSaksperiodeFromDTO,
    mapSøkerensEksisterendeSakFromDTO,
} from './eksisterendeSakUtils';

jest.mock('nav-frontend-js-utils', () => ({
    ...(jest.requireActual('nav-frontend-js-utils') as any),
    guid: () => '1',
}));

describe('eksisterendeSakUtils', () => {
    const eksisterendeSakMorTermin = {
        saksnummer: '352010329',
        sakAvsluttet: false,
        sisteSøknadMottattDato: '2022-11-27',
        kanSøkeOmEndring: true,
        sakTilhørerMor: true,
        gjelderAdopsjon: false,
        morUføretrygd: false,
        harAnnenForelderTilsvarendeRettEØS: false,
        ønskerJustertUttakVedFødsel: false,
        rettighetType: 'BEGGE_RETT',
        annenPart: {
            type: 'person',
            fnr: '06057509994',
            fornavn: 'Ändlös',
            etternavn: 'Tunfisk',
        },
        familiehendelse: {
            termindato: '2022-11-30',
            antallBarn: 1,
        },
        gjeldendeVedtak: {
            perioder: [
                {
                    fom: '2022-11-09',
                    tom: '2022-11-29',
                    kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    flerbarnsdager: false,
                },
                {
                    fom: '2022-11-30',
                    tom: '2022-12-13',
                    kontoType: 'MØDREKVOTE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    samtidigUttak: 100,
                    flerbarnsdager: false,
                },
            ],
        },
        barn: [],
        dekningsgrad: 'HUNDRE',
    } as Sak;

    const forventetMappetEksisterendeSakMorTermin = {
        erAnnenPartsSak: false,
        saksnummer: '352010329',
        grunnlag: {
            antallBarn: 1,
            dekningsgrad: '100',
            erBarnetFødt: false,
            erDeltUttak: true,
            familiehendelseDato: '2022-11-30',
            familiehendelseType: 'TERM',
            farMedmorErAleneOmOmsorg: false,
            farMedmorHarRett: true,
            termindato: '2022-11-30',
            fødselsdato: undefined,
            morErAleneOmOmsorg: false,
            morErUfør: false,
            morHarRett: true,
            omsorgsovertakelsesdato: undefined,
            søkerErFarEllerMedmor: false,
            ønskerJustertUttakVedFødsel: false,
            harAnnenForelderTilsvarendeRettEØS: false,
            barn: [],
            annenPart: { type: 'person', etternavn: 'Tunfisk', fornavn: 'Ändlös', fnr: '06057509994' },
        },
        saksperioder: [
            {
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
                guid: '1',
                periode: {
                    fom: '2022-11-09',
                    tom: '2022-11-29',
                },
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                morsAktivitet: undefined,
                overføringÅrsak: undefined,
                oppholdÅrsak: undefined,
                resultat: {
                    innvilget: true,
                    trekkerDager: true,
                    trekkerMinsterett: true,
                    årsak: 'ANNET',
                },
                samtidigUttak: undefined,
                utsettelseÅrsak: undefined,
            },
            {
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
                guid: '1',
                periode: {
                    fom: '2022-11-30',
                    tom: '2022-12-13',
                },
                kontoType: 'MØDREKVOTE',
                morsAktivitet: undefined,
                overføringÅrsak: undefined,
                oppholdÅrsak: undefined,
                resultat: {
                    innvilget: true,
                    trekkerDager: true,
                    trekkerMinsterett: true,
                    årsak: 'ANNET',
                },
                samtidigUttak: 100,
                utsettelseÅrsak: undefined,
            },
        ],
        uttaksplan: [
            {
                id: '1',
                type: 'uttak',
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                tidsperiode: {
                    fom: new Date('2022-11-09'),
                    tom: new Date('2022-11-29'),
                },
                forelder: 'mor',
                ønskerSamtidigUttak: false,
                gradert: false,
                samtidigUttakProsent: undefined,
                ønskerFlerbarnsdager: undefined,
                stillingsprosent: undefined,
                arbeidsformer: undefined,
                orgnumre: undefined,
                morsAktivitetIPerioden: undefined,
                erMorForSyk: undefined,
                angittAvAnnenPart: undefined,
            },
            {
                id: '1',
                type: 'uttak',
                konto: 'MØDREKVOTE',
                tidsperiode: {
                    fom: new Date('2022-11-30'),
                    tom: new Date('2022-12-13'),
                },
                forelder: 'mor',
                ønskerSamtidigUttak: true,
                gradert: false,
                samtidigUttakProsent: '100',
                ønskerFlerbarnsdager: undefined,
                stillingsprosent: undefined,
                arbeidsformer: undefined,
                orgnumre: undefined,
                morsAktivitetIPerioden: undefined,
                erMorForSyk: undefined,
                angittAvAnnenPart: undefined,
            },
        ],
    };

    const eksisterendeSakMorAdopsjonBareMorHarRett = {
        saksnummer: '352010530',
        sisteSøknadMottattDato: '2022-11-27',
        sakAvsluttet: false,
        kanSøkeOmEndring: true,
        sakTilhørerMor: true,
        gjelderAdopsjon: true,
        morUføretrygd: false,
        harAnnenForelderTilsvarendeRettEØS: false,
        ønskerJustertUttakVedFødsel: false,
        rettighetType: 'BARE_SØKER_RETT',
        annenPart: { type: 'person', fnr: '07459332779', fornavn: 'Munter', etternavn: 'Tyggis' },
        familiehendelse: { fødselsdato: '2022-10-01', antallBarn: 2, omsorgsovertakelse: '2022-12-24' },
        gjeldendeVedtak: {
            perioder: [
                {
                    fom: '2022-11-09',
                    tom: '2022-11-29',
                    kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: true,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    flerbarnsdager: false,
                },
            ],
        },
        barn: [],
        dekningsgrad: DekningsgradDTO.ÅTTI_PROSENT,
    } as Sak;

    const forventetMappetEksisterendeSakMorAdopsjonBareMorHarRett = {
        erAnnenPartsSak: false,
        grunnlag: {
            annenPart: { type: 'person', etternavn: 'Tyggis', fornavn: 'Munter', fnr: '07459332779' },
            antallBarn: 2,
            barn: [],
            dekningsgrad: '80',
            erBarnetFødt: true,
            erDeltUttak: false,
            familiehendelseDato: '2022-12-24',
            familiehendelseType: 'ADPSJN',
            farMedmorErAleneOmOmsorg: false,
            farMedmorHarRett: false,
            fødselsdato: '2022-10-01',
            harAnnenForelderTilsvarendeRettEØS: false,
            morErAleneOmOmsorg: false,
            morErUfør: false,
            morHarRett: true,
            omsorgsovertakelsesdato: '2022-12-24',
            søkerErFarEllerMedmor: false,
            termindato: undefined,
            ønskerJustertUttakVedFødsel: undefined,
        },
        saksnummer: '352010530',
        saksperioder: [
            {
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
                guid: '1',
                periode: {
                    fom: '2022-11-09',
                    tom: '2022-11-29',
                },
                kontoType: 'FORELDREPENGER_FØR_FØDSEL',
                morsAktivitet: undefined,
                overføringÅrsak: undefined,
                oppholdÅrsak: undefined,
                resultat: {
                    innvilget: true,
                    trekkerDager: true,
                    trekkerMinsterett: true,
                    årsak: 'ANNET',
                },
                samtidigUttak: undefined,
                utsettelseÅrsak: undefined,
            },
        ],
        uttaksplan: [
            {
                id: '1',
                type: 'uttak',
                konto: 'FORELDREPENGER_FØR_FØDSEL',
                tidsperiode: {
                    fom: new Date('2022-11-09'),
                    tom: new Date('2022-11-29'),
                },
                forelder: 'mor',
                ønskerSamtidigUttak: false,
                gradert: false,
                samtidigUttakProsent: undefined,
                ønskerFlerbarnsdager: false,
                stillingsprosent: undefined,
                arbeidsformer: undefined,
                orgnumre: undefined,
                morsAktivitetIPerioden: undefined,
                erMorForSyk: undefined,
                angittAvAnnenPart: undefined,
            },
        ],
    };

    const eksisterendeSakMedØnsketJusteringFarFødsel = {
        ...eksisterendeSakMorTermin,
        sakTilhørerMor: false,
        ønskerJustertUttakVedFødsel: true,
        familiehendelse: {
            fødselsdato: '2022-10-30',
            termindato: '2022-10-30',
            antallBarn: 1,
        },
        gjeldendeVedtak: {
            perioder: [
                {
                    fom: '2022-11-09',
                    tom: '2022-11-29',
                    kontoType: 'FEDREKVOTE',
                    resultat: {
                        innvilget: true,
                        trekkerMinsterett: false,
                        trekkerDager: true,
                        årsak: 'ANNET',
                    },
                    flerbarnsdager: false,
                },
            ],
        },
    } as Sak;

    const forventetResultatFar = {
        ...forventetMappetEksisterendeSakMorTermin,
        grunnlag: {
            ...forventetMappetEksisterendeSakMorTermin.grunnlag,
            ønskerJustertUttakVedFødsel: undefined,
            erBarnetFødt: true,
            erDeltUttak: true,
            familiehendelseDato: '2022-10-30',
            familiehendelseType: 'FODSL',
            farMedmorErAleneOmOmsorg: false,
            farMedmorHarRett: true,
            fødselsdato: '2022-10-30',
            søkerErFarEllerMedmor: true,
            termindato: '2022-10-30',
        },
        saksperioder: [
            {
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
                guid: '1',
                periode: {
                    fom: '2022-11-09',
                    tom: '2022-11-29',
                },
                kontoType: 'FEDREKVOTE',
                morsAktivitet: undefined,
                overføringÅrsak: undefined,
                oppholdÅrsak: undefined,
                resultat: {
                    innvilget: true,
                    trekkerDager: true,
                    trekkerMinsterett: false,
                    årsak: 'ANNET',
                },
                samtidigUttak: undefined,
                utsettelseÅrsak: undefined,
            },
        ],
        uttaksplan: [
            {
                id: '1',
                type: 'uttak',
                konto: 'FEDREKVOTE',
                tidsperiode: {
                    fom: new Date('2022-11-09'),
                    tom: new Date('2022-11-29'),
                },
                forelder: 'farMedmor',
                ønskerSamtidigUttak: false,
                gradert: false,
                samtidigUttakProsent: undefined,
                ønskerFlerbarnsdager: undefined,
                stillingsprosent: undefined,
                arbeidsformer: undefined,
                orgnumre: undefined,
                morsAktivitetIPerioden: undefined,
                erMorForSyk: true,
                angittAvAnnenPart: undefined,
            },
        ],
    };

    const eksisterendeSakMedØnsketJusteringFarTermin = {
        ...eksisterendeSakMedØnsketJusteringFarFødsel,
        familiehendelse: {
            ...eksisterendeSakMedØnsketJusteringFarFødsel.familiehendelse,
            fødselsdato: undefined,
        },
    } as Sak;

    const forventetResultatFarTermin = {
        ...forventetResultatFar,
        grunnlag: {
            ...forventetResultatFar.grunnlag,
            ønskerJustertUttakVedFødsel: true,
            erBarnetFødt: false,
            familiehendelseDato: '2022-10-30',
            familiehendelseType: 'TERM',
            fødselsdato: undefined,
        },
    };

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('getArbeidsformFromUttakArbeidstype', () => {
        it('skal mappe Frilans uttakarbeidstype til arbeidstype', () => {
            const arbeidsform = getArbeidsformFromUttakArbeidstype(UttakArbeidType.FRILANS);
            expect(arbeidsform).toBe(Arbeidsform.frilans);
        });

        it('skal mappe Selvstendig næringsdrivende uttakarbeidstype til arbeidstype', () => {
            const arbeidsform = getArbeidsformFromUttakArbeidstype(UttakArbeidType.SELVSTENDIG_NÆRINGSDRIVENDE);
            expect(arbeidsform).toBe(Arbeidsform.selvstendignæringsdrivende);
        });

        it('skal mappe arbeidstaker når det ikke er frilans eller selvstendig næringsdrivende', () => {
            const arbeidsform = getArbeidsformFromUttakArbeidstype(UttakArbeidType.ORDINÆRT_ARBEID);
            expect(arbeidsform).toBe(Arbeidsform.arbeidstaker);
            const arbeidsformAnnet = getArbeidsformFromUttakArbeidstype(UttakArbeidType.ANNET);
            expect(arbeidsformAnnet).toBe(Arbeidsform.arbeidstaker);
        });
    });

    describe('mapSøkerensEksisterendeSakFromDTO', () => {
        it('skal mappe eksisterende sak for mors søknad på termin fra dto til intern representasjon', () => {
            const internRep = mapSøkerensEksisterendeSakFromDTO(eksisterendeSakMorTermin, undefined);
            expect(internRep).toStrictEqual(forventetMappetEksisterendeSakMorTermin);
        });
        it('skal mappe eksisterende sak for mors søknad på adopsjon (aleneomsorg) fra dto til intern representasjon', () => {
            const internRep = mapSøkerensEksisterendeSakFromDTO(eksisterendeSakMorAdopsjonBareMorHarRett, undefined);
            expect(internRep).toStrictEqual(forventetMappetEksisterendeSakMorAdopsjonBareMorHarRett);
        });

        it('hvis barnet til far er født, skal ikke mappe ønskerJustertUttakVedFødsel til true selv om den kommer inn som true', () => {
            const internRep = mapSøkerensEksisterendeSakFromDTO(eksisterendeSakMedØnsketJusteringFarFødsel, undefined);

            expect(internRep).toStrictEqual(forventetResultatFar);
        });
        it('hvis barnet til far ikke er født, skal mappe ønskerJustertUttakVedFødsel til true hvis den kommer inn som true', () => {
            const internRep = mapSøkerensEksisterendeSakFromDTO(eksisterendeSakMedØnsketJusteringFarTermin, undefined);

            expect(internRep).toStrictEqual(forventetResultatFarTermin);
        });
    });
    describe('mapSaksperiodeFromDTO', () => {
        const uttaksperiode = {
            fom: '2022-12-07',
            tom: '2022-12-07',
            kontoType: 'MØDREKVOTE',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
            morsAktivitet: 'ARBEID',
            gradering: {
                arbeidstidprosent: 55,
                aktivitet: {
                    type: 'FRILANS',
                    arbeidsgiver: {
                        id: 'string',
                        type: 'PRIVAT',
                    },
                },
            },
            samtidigUttak: 50,
            flerbarnsdager: true,
        } as SaksperiodeDTO;
        const { fom, tom, ...uttaksperiodeRest } = uttaksperiode;

        const forventetMappetPeriodeSøker = {
            ...uttaksperiodeRest,
            gjelderAnnenPart: false,
            guid: '1',
            oppholdÅrsak: undefined,
            overføringÅrsak: undefined,
            periode: { fom: '2022-12-07', tom: '2022-12-07' },
            utsettelseÅrsak: undefined,
        };

        const forventetMappetPeriodeAnnenPart = { ...forventetMappetPeriodeSøker, gjelderAnnenPart: true };

        const utsettelsesperiode = {
            fom: '2021-11-02',
            tom: '2021-11-02',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
            utsettelseÅrsak: 'HV_ØVELSE',
        } as SaksperiodeDTO;
        const { fom: fomU, tom: tomU, ...utsettelsesperiodeRest } = utsettelsesperiode;

        const forventetMappetUtsettelseSøker = {
            ...utsettelsesperiodeRest,
            gjelderAnnenPart: false,
            guid: '1',
            oppholdÅrsak: undefined,
            overføringÅrsak: undefined,
            periode: { fom: '2021-11-02', tom: '2021-11-02' },
            samtidigUttak: undefined,
            flerbarnsdager: undefined,
            gradering: undefined,
            kontoType: undefined,
            morsAktivitet: undefined,
        };

        const forventetMappetUtsettelseAnnenPart = { ...forventetMappetUtsettelseSøker, gjelderAnnenPart: true };

        const overføringsperiode = {
            fom: '2022-11-07',
            tom: '2022-11-07',
            kontoType: 'FEDREKVOTE',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
            overføringÅrsak: 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER',
        } as SaksperiodeDTO;
        const { fom: fomO, tom: tomO, ...overføringsperiodeRest } = overføringsperiode;
        const forventetMappetOverføringSøker = {
            ...overføringsperiodeRest,
            gjelderAnnenPart: false,
            guid: '1',
            oppholdÅrsak: undefined,
            periode: { fom: '2022-11-07', tom: '2022-11-07' },
            samtidigUttak: undefined,
            flerbarnsdager: undefined,
            gradering: undefined,
            kontoType: 'FEDREKVOTE',
            morsAktivitet: undefined,
            utsettelseÅrsak: undefined,
        };
        const forventetMappetOverføringAnnenPart = { ...forventetMappetOverføringSøker, gjelderAnnenPart: true };

        const oppholdsperiode = {
            fom: '2022-08-05',
            tom: '2022-08-05',
            resultat: {
                innvilget: true,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
            oppholdÅrsak: 'MØDREKVOTE_ANNEN_FORELDER',
        } as SaksperiodeDTO;
        const { fom: fomOp, tom: tomOp, ...oppholdsperiodeRest } = oppholdsperiode;

        const forventetMappetOppholdSøker = {
            ...oppholdsperiodeRest,
            gjelderAnnenPart: true,
            guid: '1',
            kontoType: 'MØDREKVOTE',
            periode: { fom: '2022-08-05', tom: '2022-08-05' },
            samtidigUttak: undefined,
            flerbarnsdager: undefined,
            gradering: undefined,
            morsAktivitet: undefined,
            utsettelseÅrsak: undefined,
            oppholdÅrsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
            overføringÅrsak: undefined,
        };

        const forventetMappetOppholdAnnenPart = {
            ...forventetMappetOppholdSøker,
            gjelderAnnenPart: false,
            angittAvAnnenPart: true,
        };

        const avslåttPeriode = {
            fom: '2022-10-07',
            tom: '2022-10-07',
            kontoType: 'MØDREKVOTE',
            resultat: {
                innvilget: false,
                trekkerMinsterett: false,
                trekkerDager: true,
                årsak: 'ANNET',
            },
        } as SaksperiodeDTO;

        const { fom: fomAp, tom: tomAp, ...avslåttPeriodeRest } = avslåttPeriode;

        const forventetMappetAvslåttPeriodeSøker = {
            ...avslåttPeriodeRest,
            gjelderAnnenPart: false,
            flerbarnsdager: undefined,
            gradering: undefined,
            guid: '1',
            periode: { fom: '2022-10-07', tom: '2022-10-07' },
            morsAktivitet: undefined,
            oppholdÅrsak: undefined,
            overføringÅrsak: undefined,
            samtidigUttak: undefined,
            utsettelseÅrsak: undefined,
        };

        it('map søkerens uttaksperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(uttaksperiode, false);
            expect(mappetPeriode).toStrictEqual(forventetMappetPeriodeSøker);
        });
        it('map annen parts uttaksperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(uttaksperiode, true);
            expect(mappetPeriode).toStrictEqual(forventetMappetPeriodeAnnenPart);
        });
        it('map søkerens utsettelsesoperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(utsettelsesperiode, false);
            expect(mappetPeriode).toStrictEqual(forventetMappetUtsettelseSøker);
        });
        it('map annen parts utsettelsesoperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(utsettelsesperiode, true);
            expect(mappetPeriode).toStrictEqual(forventetMappetUtsettelseAnnenPart);
        });
        it('map søkerens overføringsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(overføringsperiode, false);
            expect(mappetPeriode).toStrictEqual(forventetMappetOverføringSøker);
        });
        it('map annen parts overføringsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(overføringsperiode, true);
            expect(mappetPeriode).toStrictEqual(forventetMappetOverføringAnnenPart);
        });
        it('map søkerens oppholdsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(oppholdsperiode, false);
            expect(mappetPeriode).toStrictEqual(forventetMappetOppholdSøker);
        });
        it('map annen parts oppholdsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(oppholdsperiode, true);
            expect(mappetPeriode).toStrictEqual(forventetMappetOppholdAnnenPart);
        });
        it('map søkerens avslåtte periode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(avslåttPeriode, false);
            expect(mappetPeriode).toStrictEqual(forventetMappetAvslåttPeriodeSøker);
        });
    });
});
