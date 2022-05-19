import {
    getFarMedmorUttakRundtFødsel,
    getFørsteUttaksdag2UkerFørFødsel,
    getSisteUttaksdag6UkerEtterFødsel,
} from 'app/utils/wlbUtils';
import { RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { andreAugust2022ReglerGjelder, formaterDatoKompakt } from 'app/utils/dateUtils';
import { RegelTest } from 'shared/types';
import { getSumUttaksdagerÅTrekkeIPeriodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL } from 'app/utils/wlbUtils';

export const farMedMorHarRettPåUttakRundtFødselTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const gjelderWLB = andreAugust2022ReglerGjelder(grunnlag.familiehendelsesdato);
    if (!gjelderWLB || !grunnlag.søkerErFarEllerMedmor || (grunnlag.søkerErFarEllerMedmor && !grunnlag.morHarRett)) {
        return {
            passerer: true,
        };
    }
    const perioderRundtFødsel = getFarMedmorUttakRundtFødsel(grunnlag.perioder, grunnlag.familiehendelsesdato);

    let dagerIgjenRundtFødsel;
    const førsteUttaksdag2UkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(grunnlag.familiehendelsesdato);
    const sisteUttak6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato);

    if (perioderRundtFødsel.length > 0) {
        const antallUttaksdagerRundtFødsel = getSumUttaksdagerÅTrekkeIPeriodene(perioderRundtFødsel);
        dagerIgjenRundtFødsel = ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL - antallUttaksdagerRundtFødsel;
    } else {
        dagerIgjenRundtFødsel = ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL;
    }
    return {
        passerer: dagerIgjenRundtFødsel <= 0,
        info: {
            intlKey: 'uttaksplan.validering.info.rettTilUttakRundtFødsel',
            values: {
                fraDato: formaterDatoKompakt(førsteUttaksdag2UkerFørFødsel),
                tilDato: formaterDatoKompakt(sisteUttak6UkerEtterFødsel),
                antallDager: dagerIgjenRundtFødsel,
            },
        },
    };
};
