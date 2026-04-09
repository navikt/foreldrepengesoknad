import { FpSak_fpoversikt, UttakPeriode_fpoversikt } from '@navikt/fp-types';

import { mapSaksperiodeFromDTO, mapSøkerensEksisterendeSakFromDTO } from './eksisterendeSakUtils';

describe('eksisterendeSakUtils', () => {
    const eksisterendeSakMorTermin = {
        saksnummer: '352010329',
        sakAvsluttet: false,
        oppdatertTidspunkt: '2022-11-27',
        kanSøkeOmEndring: true,
        sakTilhørerMor: true,
        gjelderAdopsjon: false,
        morUføretrygd: false,
        harAnnenForelderTilsvarendeRettEØS: false,
        ønskerJustertUttakVedFødsel: false,
        rettighetType: 'BEGGE_RETT',
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
                    forelder: 'MOR',
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
                    forelder: 'MOR',
                },
            ],
        },
        dekningsgrad: 'HUNDRE',
        forelder: 'MOR',
    } satisfies FpSak_fpoversikt;

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
        },
        saksperioder: [
            expect.objectContaining({
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
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
            }),
            expect.objectContaining({
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
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
            }),
        ],
    };

    const eksisterendeSakMorAdopsjonBareMorHarRett = {
        saksnummer: '352010530',
        oppdatertTidspunkt: '2022-11-27',
        sakAvsluttet: false,
        kanSøkeOmEndring: true,
        sakTilhørerMor: true,
        gjelderAdopsjon: true,
        morUføretrygd: false,
        harAnnenForelderTilsvarendeRettEØS: false,
        ønskerJustertUttakVedFødsel: false,
        rettighetType: 'BARE_SØKER_RETT',
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
                    forelder: 'MOR',
                },
            ],
        },
        dekningsgrad: 'ÅTTI',
        forelder: 'MOR',
    } satisfies FpSak_fpoversikt;

    const forventetMappetEksisterendeSakMorAdopsjonBareMorHarRett = {
        erAnnenPartsSak: false,
        grunnlag: {
            antallBarn: 2,
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
            expect.objectContaining({
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
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
            }),
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
                    forelder: 'FAR_MEDMOR',
                },
            ],
        },
    } satisfies FpSak_fpoversikt;

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
            expect.objectContaining({
                flerbarnsdager: false,
                gjelderAnnenPart: false,
                gradering: undefined,
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
            }),
        ],
    };

    const eksisterendeSakMedØnsketJusteringFarTermin = {
        ...eksisterendeSakMedØnsketJusteringFarFødsel,
        familiehendelse: {
            ...eksisterendeSakMedØnsketJusteringFarFødsel.familiehendelse,
            fødselsdato: undefined,
        },
    } satisfies FpSak_fpoversikt;

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
        vi.clearAllMocks();
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
            forelder: 'MOR',
        } satisfies UttakPeriode_fpoversikt;

        const { fom, tom, ...uttaksperiodeRest } = uttaksperiode;

        const forventetMappetPeriodeSøker = {
            ...uttaksperiodeRest,
            gjelderAnnenPart: false,
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
            forelder: 'MOR',
            flerbarnsdager: false,
        } satisfies UttakPeriode_fpoversikt;

        const { fom: fomU, tom: tomU, ...utsettelsesperiodeRest } = utsettelsesperiode;

        const forventetMappetUtsettelseSøker = {
            ...utsettelsesperiodeRest,
            gjelderAnnenPart: false,
            oppholdÅrsak: undefined,
            overføringÅrsak: undefined,
            periode: { fom: '2021-11-02', tom: '2021-11-02' },
            samtidigUttak: undefined,
            flerbarnsdager: false,
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
            flerbarnsdager: false,
            forelder: 'FAR_MEDMOR',
        } satisfies UttakPeriode_fpoversikt;

        const { fom: fomO, tom: tomO, ...overføringsperiodeRest } = overføringsperiode;
        const forventetMappetOverføringSøker = {
            ...overføringsperiodeRest,
            gjelderAnnenPart: false,
            oppholdÅrsak: undefined,
            periode: { fom: '2022-11-07', tom: '2022-11-07' },
            samtidigUttak: undefined,
            flerbarnsdager: false,
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
            forelder: 'MOR',
            flerbarnsdager: false,
        } satisfies UttakPeriode_fpoversikt;

        const { fom: fomOp, tom: tomOp, ...oppholdsperiodeRest } = oppholdsperiode;

        const forventetMappetOppholdSøker = {
            ...oppholdsperiodeRest,
            gjelderAnnenPart: true,
            kontoType: 'MØDREKVOTE',
            periode: { fom: '2022-08-05', tom: '2022-08-05' },
            samtidigUttak: undefined,
            forelder: 'MOR',
            flerbarnsdager: false,
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
            forelder: 'MOR',
            flerbarnsdager: false,
        } satisfies UttakPeriode_fpoversikt;

        const { fom: fomAp, tom: tomAp, ...avslåttPeriodeRest } = avslåttPeriode;

        const forventetMappetAvslåttPeriodeSøker = {
            ...avslåttPeriodeRest,
            gjelderAnnenPart: false,
            flerbarnsdager: false,
            forelder: 'MOR',
            gradering: undefined,
            periode: { fom: '2022-10-07', tom: '2022-10-07' },
            morsAktivitet: undefined,
            oppholdÅrsak: undefined,
            overføringÅrsak: undefined,
            samtidigUttak: undefined,
            utsettelseÅrsak: undefined,
        };

        it('map søkerens uttaksperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(uttaksperiode, false);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetPeriodeSøker));
        });
        it('map annen parts uttaksperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(uttaksperiode, true);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetPeriodeAnnenPart));
        });
        it('map søkerens utsettelsesoperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(utsettelsesperiode, false);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetUtsettelseSøker));
        });
        it('map annen parts utsettelsesoperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(utsettelsesperiode, true);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetUtsettelseAnnenPart));
        });
        it('map søkerens overføringsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(overføringsperiode, false);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetOverføringSøker));
        });
        it('map annen parts overføringsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(overføringsperiode, true);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetOverføringAnnenPart));
        });
        it('map søkerens oppholdsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(oppholdsperiode, false);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetOppholdSøker));
        });
        it('map annen parts oppholdsperiode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(oppholdsperiode, true);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetOppholdAnnenPart));
        });
        it('map søkerens avslåtte periode fra DTO', () => {
            const mappetPeriode = mapSaksperiodeFromDTO(avslåttPeriode, false);
            expect(mappetPeriode).toStrictEqual(expect.objectContaining(forventetMappetAvslåttPeriodeSøker));
        });
    });
});
