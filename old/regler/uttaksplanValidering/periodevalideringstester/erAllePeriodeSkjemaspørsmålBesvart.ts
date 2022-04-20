import { UttaksplanRegelgrunnlag } from '../types';
import { RegelTestresultat, RegelTest } from 'shared/regler/regelTypes';

import { Periode, TilgjengeligStønadskonto, Periodetype } from 'app/types/uttaksplan/periodetyper';
import { Søknadsinfo } from 'app/selectors/types';
import { getUttakFormVisibility } from 'app/components/uttaksplanlegger/components/uttakForm/uttakFormConfig';
import { getVelgbareStønadskontotyper } from 'app/util/uttaksplan/stønadskontoer';
import getUttakSkjemaregler from 'app/regler/uttak/uttaksskjema/uttakSkjemaregler';
import getSøknadsperiode from 'app/regler/søknadsperioden/Søknadsperioden';
import { getUtsettelseFormVisibility } from 'app/components/uttaksplanlegger/components/utsettelseForm/utsettelseFormConfig';
import { getVariantFromPeriode } from 'app/components/uttaksplanlegger/components/utsettelseForm/UtsettelseForm';
import Arbeidsforhold from 'app/types/Arbeidsforhold';

const erAlleSpørsmålBesvart = (
    periode: Periode,
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[],
    søknadsinfo: Søknadsinfo,
    arbeidsforhold: Arbeidsforhold[]
): boolean => {
    switch (periode.type) {
        case Periodetype.Hull:
        case Periodetype.Info:
        case Periodetype.PeriodeUtenUttak:
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
                søknadsperiode: getSøknadsperiode(søknadsinfo, periode),
            }).areAllQuestionsAnswered();
        case Periodetype.Utsettelse:
            return getUtsettelseFormVisibility({
                periode,
                variant: getVariantFromPeriode(periode),
                søknadsinfo,
                arbeidsforhold,
            }).areAllQuestionsAnswered();
    }
};

export const erAllePeriodeSkjemaspørsmålBesvart: RegelTest = (grunnlag: UttaksplanRegelgrunnlag): RegelTestresultat => {
    const perioderMedUbesvarteSpørsmål = grunnlag.perioder.filter(
        (periode) =>
            erAlleSpørsmålBesvart(
                periode,
                grunnlag.tilgjengeligeStønadskontoer,
                grunnlag.søknadsinfo,
                grunnlag.arbeidsforhold
            ) === false
    );
    return {
        passerer: perioderMedUbesvarteSpørsmål.length === 0,
        info: perioderMedUbesvarteSpørsmål.map((periode) => ({
            periodeId: periode.id,
        })),
    };
};
