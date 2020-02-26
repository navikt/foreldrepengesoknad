import { UttaksplanDTO, UttaksplanPeriodeDTO } from 'app/api/types/uttaksplanDTO';
import { PeriodeResultatType, ArbeidsgiverInfoType, UttakArbeidType } from 'app/types/EksisterendeSak';
import { RecursivePartial } from 'app/types/Partial';
import { getEksisterendeSakFromDTO } from '../eksisterendeSakUtils';
import { Utsettelsesperiode, Arbeidsform } from 'app/types/uttaksplan/periodetyper';

describe('eksisterendeSakUtils', () => {
    describe('getEksisterendeSakFromDTO', () => {
        it('Skal håndtere at arbeidsformer fra forskjellige arbeidsforhold blir merget', () => {
            const utsettelse: Partial<UttaksplanPeriodeDTO> = {
                periodeResultatType: PeriodeResultatType.INNVILGET,
                utsettelsePeriodeType: 'ARBEID',
                graderingInnvilget: false,
                samtidigUttak: false,
                samtidigUttaksprosent: 0,
                stønadskontotype: 'FORELDREPENGER',
                trekkDager: 30,
                arbeidstidprosent: 100,
                utbetalingprosent: 0,
                gjelderAnnenPart: false,
                flerbarnsdager: false,
                uttakArbeidType: UttakArbeidType.FRILANS,
                arbeidsgiverInfo: {
                    id: '973861778',
                    type: ArbeidsgiverInfoType.ORGANISASJON,
                    navn: 'EQUINOR ASA, AVD STATOIL SOKKELVIRKSOMHET'
                },
                periode: {
                    fom: '2019-10-21',
                    tom: '2019-11-29'
                }
            };
            const utsettelse2 = { ...utsettelse, uttakArbeidType: UttakArbeidType.SELVSTENDIG_NÆRINGSDRIVENDE };
            const utsettelse3 = { ...utsettelse, uttakArbeidType: UttakArbeidType.ORDINÆRT_ARBEID };

            const uttaksplanDTO: RecursivePartial<UttaksplanDTO> = {
                grunnlag: {
                    fødselsdato: '2019-09-01',
                    dekningsgrad: 100,
                    antallBarn: 1,
                    søkerErFarEllerMedmor: true,
                    morErAleneOmOmsorg: false,
                    morHarRett: false,
                    morErUfør: true,
                    farMedmorErAleneOmOmsorg: false,
                    farMedmorHarRett: true,
                    søkerKjønn: 'M',
                    omsorgsovertakelsesdato: '2019-09-01'
                },
                perioder: [utsettelse, utsettelse2, utsettelse3]
            };
            const result = getEksisterendeSakFromDTO(uttaksplanDTO as UttaksplanDTO, false);

            expect(result).toBeDefined();

            if (result !== undefined) {
                expect(result.uttaksplan).toBeDefined();

                if (result.uttaksplan) {
                    const mergetUtsettelsesPeriode = result.uttaksplan[0] as Utsettelsesperiode;
                    expect(mergetUtsettelsesPeriode.arbeidsformer).toBeDefined();

                    if (mergetUtsettelsesPeriode.arbeidsformer) {
                        expect(mergetUtsettelsesPeriode.arbeidsformer).toHaveLength(3);
                        expect(mergetUtsettelsesPeriode.arbeidsformer[0]).toEqual(Arbeidsform.frilans);
                        expect(mergetUtsettelsesPeriode.arbeidsformer[1]).toEqual(
                            Arbeidsform.selvstendignæringsdrivende
                        );
                        expect(mergetUtsettelsesPeriode.arbeidsformer[2]).toEqual(Arbeidsform.arbeidstaker);
                    }
                }
            }
        });
    });
});
