import {
    PeriodeResultatType,
    UttakArbeidType,
    ArbeidsgiverInfoType,
    EksisterendeSak,
    FamiliehendelsesType
} from 'app/types/EksisterendeSak';
import { StønadskontoType, Dekningsgrad } from 'common/types';
import { MorsAktivitet, Periodetype, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { mapUttaksperiodeFromSaksperiode } from '../mapSaksperioderTilUttaksperioder';

const morUfør: Pick<EksisterendeSak, 'grunnlag' | 'saksperioder'> = {
    grunnlag: {
        familieHendelseDato: new Date('2019-09-01'),
        dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
        antallBarn: 1,
        søkerErFarEllerMedmor: true,
        morErAleneOmOmsorg: false,
        morHarRett: false,
        morErUfør: true,
        farMedmorErAleneOmOmsorg: false,
        farMedmorHarRett: true,
        erBarnetFødt: true,
        erDeltUttak: false,
        familieHendelseType: FamiliehendelsesType.FØDSEL
    },
    saksperioder: [
        {
            guid: '1',
            periodeResultatType: PeriodeResultatType.INNVILGET,
            graderingInnvilget: false,
            samtidigUttak: false,
            stønadskontotype: StønadskontoType.Foreldrepenger,
            trekkDager: 30,
            arbeidstidprosent: 0,
            samtidigUttaksprosent: 0,
            utbetalingsprosent: 100,
            gjelderAnnenPart: false,
            morsAktivitetIPerioden: MorsAktivitet.Uføre,
            flerbarnsdager: false,
            uttakArbeidType: [UttakArbeidType.ORDINÆRT_ARBEID],
            arbeidsgiverInfo: {
                id: '973861778',
                type: ArbeidsgiverInfoType.ORGANISASJON,
                navn: 'EQUINOR ASA, AVD STATOIL SOKKELVIRKSOMHET'
            },
            tidsperiode: {
                fom: new Date('2019-10-21'),
                tom: new Date('2019-11-29')
            }
        }
    ]
};

describe('mapSaksperioderTilUttaksperioder', () => {
    describe('mapUttaksperiodeFromSaksperiode', () => {
        it('Skal korrekt mappe aktivitetsfri kvote grunnet mor er ufør', () => {
            const result = mapUttaksperiodeFromSaksperiode(
                morUfør.saksperioder[0],
                morUfør.grunnlag,
                morUfør.saksperioder
            );
            expect(result).toBeDefined();

            if (result && isUttaksperiode(result)) {
                expect(result.type).toEqual(Periodetype.Uttak);
                expect(result.konto).toEqual(StønadskontoType.AktivitetsfriKvote);
            }
        });
    });
});
