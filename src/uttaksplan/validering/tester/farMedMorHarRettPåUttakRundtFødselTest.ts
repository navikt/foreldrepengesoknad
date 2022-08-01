import {
    ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL,
    getFarMedmorUttakRundtFødsel,
    getFørsteUttaksdag2UkerFørFødsel,
    getSisteUttaksdag6UkerEtterFødsel,
    gjelderWLBReglerFarMedmorRundtFødsel,
} from 'app/utils/wlbUtils';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { Søknadsinfo } from '../utils/types/Søknadsinfo';
import { formaterDatoKompakt } from 'app/utils/dateUtils';
import { getSumUttaksdagerÅTrekkeIPeriodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';

export const farMedMorHarRettPåUttakRundtFødselTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const tattUtForMangeDagerIPlanen = erUttaksmengdeForFarMedmorForHøyTest(grunnlag).passerer === false;
    if (
        !gjelderWLBReglerFarMedmorRundtFødsel(
            grunnlag.familiehendelsesdato,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.morHarRett,
            grunnlag.søkersituasjon.situasjon
        ) ||
        tattUtForMangeDagerIPlanen
    ) {
        return {
            passerer: true,
        };
    }
    const perioderRundtFødsel = getFarMedmorUttakRundtFødsel(
        grunnlag.perioder,
        grunnlag.familiehendelsesdato,
        grunnlag.termindato
    );

    let dagerIgjenRundtFødsel;
    const førsteUttaksdag2UkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(
        grunnlag.familiehendelsesdato,
        grunnlag.termindato
    );
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
                antallDager: Math.round(dagerIgjenRundtFødsel * 10) / 10,
            },
        },
    };
};
