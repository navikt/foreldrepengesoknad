import { PeriodeResultatÅrsak } from 'uttaksplan/types/PeriodeResultatÅrsak';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import { getKontotypeBareFarHarRett } from './mapSaksperioderTilUttaksperioder';

describe('getKontotypeBareFarHarRett', () => {
    it('skal returnere konto med aktivitetskrav for bare far har rett når perioden er innvilget med årsak 2004', () => {
        const konto = getKontotypeBareFarHarRett(PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2004);
        expect(konto).toEqual(StønadskontoType.Foreldrepenger);
    });
    it('skal returnere konto med aktivitetskrav for bare far har rett når perioden er innvilget med årsak 2033', () => {
        const konto = getKontotypeBareFarHarRett(PeriodeResultatÅrsak.BFHRMedAktivitetsKrav_2033);
        expect(konto).toEqual(StønadskontoType.Foreldrepenger);
    });
    it('skal returnere konto uten aktivitetskrav for bare far har rett når perioden er innvilget med annen årsak enn 2004 og 2033', () => {
        const konto = getKontotypeBareFarHarRett('2000');
        expect(konto).toEqual(StønadskontoType.AktivitetsfriKvote);
    });
});
