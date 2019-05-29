import { Regelgrunnlag, RegelTest, RegelTestresultat } from '../types';
import { Periode, TilgjengeligStønadskonto, Periodetype } from 'app/types/uttaksplan/periodetyper';
import { Søknadsinfo } from 'app/selectors/types';
import { getUttakFormVisibility } from 'app/components/uttak-form/uttakFormConfig';
import { getVelgbareStønadskontotyper } from 'app/util/uttaksplan/stønadskontoer';
import getUttakSkjemaregler from 'app/regler/uttak/uttaksskjema/uttakSkjemaregler';
import getSøknadsperiode from 'app/regler/søknadsperioden/Søknadsperioden';
import { getUtsettelseFormVisibility } from 'app/components/utsettelse-form/utsettelseFormConfig';
import { getVariantFromPeriode } from 'app/components/utsettelse-form/UtsettelseForm';

const erAlleSpørsmålBesvart = (
    periode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    søknadsinfo: Søknadsinfo
): boolean => {
    switch (periode.type) {
        case Periodetype.Hull:
        case Periodetype.Info:
            return true;
        case Periodetype.Overføring:
        case Periodetype.Uttak:
        case Periodetype.Opphold:
            return getUttakFormVisibility({
                periode,
                velgbareStønadskontotyper: getVelgbareStønadskontotyper(tilgjengeligeStønadskontoer),
                kanEndreStønadskonto: true,
                søknadsinfo,
                skjemaregler: getUttakSkjemaregler(søknadsinfo, periode),
                søknadsperiode: getSøknadsperiode(søknadsinfo, periode)
            }).areAllQuestionsAnswered();
        case Periodetype.Utsettelse:
            return getUtsettelseFormVisibility({
                periode,
                variant: getVariantFromPeriode(periode),
                søknadsinfo
            }).areAllQuestionsAnswered();
    }
};

export const erAllePeriodeSkjemaspørsmålBesvart: RegelTest = (grunnlag: Regelgrunnlag): RegelTestresultat => {
    const perioderMedUbesvarteSpørsmål = grunnlag.perioder.filter(
        (periode) =>
            erAlleSpørsmålBesvart(periode, grunnlag.tilgjengeligeStønadskontoer, grunnlag.søknadsinfo) === false
    );
    return {
        passerer: perioderMedUbesvarteSpørsmål.length === 0,
        info: perioderMedUbesvarteSpørsmål.map((periode) => ({
            periodeId: periode.id
        }))
    };
};
