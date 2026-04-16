import { FpSak_fpoversikt } from '@navikt/fp-types';

import { mapSøkerensEksisterendeSakFromDTO } from './eksisterendeSakUtils';

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
});
