import { ArbeidsgiverInfoType } from 'app/types/ArbeidsgiverInfo';
import { EksisterendeSakDTO } from 'app/types/EksisterendeSakDTO';
import { UttakArbeidType } from 'app/types/UttakArbeidType';
import { MorsAktivitet } from 'uttaksplan/types/MorsAktivitet';
import { OppholdÅrsakType } from 'uttaksplan/types/OppholdÅrsakType';
import { Arbeidsform } from 'uttaksplan/types/Periode';
import { PeriodeResultatType } from 'uttaksplan/types/PeriodeResultatType';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getArbeidsformFromUttakArbeidstype, mapEksisterendeSakFromDTO } from './eksisterendeSakUtils';

jest.mock('nav-frontend-js-utils', () => ({
    ...(jest.requireActual('nav-frontend-js-utils') as any),
    guid: () => '1',
}));

describe('eksisterendeSakUtils', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

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

    it('skal mappe eksisternde sak fra dto til intern representasjon', () => {
        const eksisterendeSak = {
            grunnlag: {
                annenForelderErInformert: true,
                antallBarn: 1,
                dekningsgrad: 100,
                farMedmorErAleneOmOmsorg: false,
                farMedmorHarRett: true,
                fødselsdato: '2021-01-01',
                morErAleneOmOmsorg: false,
                morErUfør: false,
                morHarRett: true,
                søkerErFarEllerMedmor: false,
                termindato: '2021-01-02',
            },
            perioder: [
                {
                    arbeidsgiverInfo: {
                        id: '1',
                        type: ArbeidsgiverInfoType.ORGANISASJON,
                        navn: 'Auto Joakim',
                    },
                    arbeidstidprosent: 100,
                    flerbarnsdager: true,
                    gjelderAnnenPart: false,
                    graderingInnvilget: true,
                    morsAktivitet: MorsAktivitet.Arbeid,
                    oppholdAarsak: OppholdÅrsakType.UttakMødrekvoteAnnenForelder,
                    periode: {
                        fom: '2021-01-01',
                        tom: '2021-02-01',
                    },
                    periodeResultatType: PeriodeResultatType.IKKE_FASTSATT,
                    samtidigUttak: true,
                    stønadskontotype: StønadskontoType.Mødrekvote,
                    trekkDager: 1,
                    utbetalingsprosent: 100,
                    uttakArbeidType: UttakArbeidType.ANNET,
                },
            ],
        } as EksisterendeSakDTO;
        const erFarEllerMedmor = true;
        const erAnnenPartsSak = true;

        const internRep = mapEksisterendeSakFromDTO(eksisterendeSak, erFarEllerMedmor, erAnnenPartsSak);

        expect(internRep).toStrictEqual({
            erAnnenPartsSak: true,
            grunnlag: {
                annenForelderErInformert: true,
                antallBarn: 1,
                dekningsgrad: '100',
                erBarnetFødt: true,
                erDeltUttak: true,
                familiehendelseDato: '2021-01-01',
                familiehendelseType: 'FODSL',
                farMedmorErAleneOmOmsorg: false,
                farMedmorHarRett: true,
                fødselsdato: '2021-01-01',
                morErAleneOmOmsorg: false,
                morErUfør: false,
                morHarRett: true,
                omsorgsovertakelsesdato: undefined,
                termindato: '2021-01-02',
                søkerErFarEllerMedmor: false,
            },
            saksperioder: [
                {
                    arbeidsgiverInfo: {
                        id: '1',
                        navn: 'Auto Joakim',
                        type: 'ORGANISASJON',
                    },
                    arbeidstidprosent: 100,
                    flerbarnsdager: true,
                    gjelderAnnenPart: true,
                    graderingInnvilget: true,
                    guid: '1',
                    morsAktivitet: 'ARBEID',
                    oppholdAarsak: 'UTTAK_MØDREKVOTE_ANNEN_FORELDER',
                    periode: {
                        fom: '2021-01-01',
                        tom: '2021-02-01',
                    },
                    periodeResultatType: 'IKKE_FASTSATT',
                    samtidigUttak: true,
                    stønadskontotype: 'MØDREKVOTE',
                    trekkDager: 1,
                    utbetalingsprosent: 100,
                    uttakArbeidType: ['ANNET'],
                },
            ],
            uttaksplan: [],
        });
    });
});
