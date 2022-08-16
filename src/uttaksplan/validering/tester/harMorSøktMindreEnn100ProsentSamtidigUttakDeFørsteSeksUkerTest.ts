import { getSisteUttaksdag6UkerEtterFødsel } from 'app/utils/wlbUtils';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import dayjs from 'dayjs';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { isUttaksperiode } from 'uttaksplan/types/Periode';
import Søkersituasjon from 'app/steps/søkersituasjon/Søkersituasjon';

export const harMorSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUkerTest: RegelTest = (
    grunnlag: Søknadsinfo
): RegelTestresultat => {
    const søkerErMor = !grunnlag.søkerErFarEllerMedmor;
    if (søkerErMor && grunnlag.søkersituasjon.situasjon === 'fødsel') {
        const sisteUttaksdagEtterSeksUker = getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato);
        const perioderMedSamtidigUttakUnder100ProsentInnenFørsteSeksUker = grunnlag.perioder.filter(
            (p) =>
                isUttaksperiode(p) &&
                dayjs(p.tidsperiode.fom).isSameOrBefore(sisteUttaksdagEtterSeksUker, 'day') &&
                p.ønskerSamtidigUttak === true &&
                p.samtidigUttakProsent !== undefined &&
                parseInt(p.samtidigUttakProsent, 10) < 100
        );

        return {
            passerer: perioderMedSamtidigUttakUnder100ProsentInnenFørsteSeksUker.length <= 0,
            info: {
                intlKey: 'uttaksplan.validering.feil.morHarSøktMindreEnn100ProsentSamtidigUttakDeFørsteSeksUker',
            },
        };
    }
    return { passerer: true };
};
