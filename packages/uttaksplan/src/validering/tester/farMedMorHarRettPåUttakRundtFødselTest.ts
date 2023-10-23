import {
    ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL,
    Søknadsinfo,
    formaterDatoKompakt,
    getFarMedmorUttakRundtFødsel,
    getFørsteUttaksdag2UkerFørFødsel,
    getSisteUttaksdag6UkerEtterFødsel,
    getSumUttaksdagerÅTrekkeIPeriodene,
    gjelderWLBReglerFarMedmorRundtFødsel,
} from '@navikt/fp-common';
import { RegelTest, RegelTestresultat } from '../utils/types/regelTypes';
import { erUttaksmengdeForFarMedmorForHøyTest } from './erUttaksmengdeForFarMedmorForHøyTest';
import dayjs from 'dayjs';

export const farMedMorHarRettPåUttakRundtFødselTest: RegelTest = (grunnlag: Søknadsinfo): RegelTestresultat => {
    const tattUtForMangeDagerIPlanen = erUttaksmengdeForFarMedmorForHøyTest(grunnlag).passerer === false;
    if (
        !gjelderWLBReglerFarMedmorRundtFødsel(
            grunnlag.familiehendelsesdato,
            grunnlag.søkerErFarEllerMedmor,
            grunnlag.morHarRett,
            grunnlag.søkersituasjon.situasjon,
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
        grunnlag.termindato,
    );

    let dagerIgjenRundtFødsel;
    const førsteUttaksdag2UkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(
        grunnlag.familiehendelsesdato,
        grunnlag.termindato,
    );
    const sisteUttak6UkerEtterFødsel = getSisteUttaksdag6UkerEtterFødsel(grunnlag.familiehendelsesdato);

    if (perioderRundtFødsel.length > 0) {
        const antallUttaksdagerRundtFødsel = getSumUttaksdagerÅTrekkeIPeriodene(perioderRundtFødsel);
        dagerIgjenRundtFødsel = ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL - antallUttaksdagerRundtFødsel;
    } else {
        dagerIgjenRundtFødsel = ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL;
    }
    const erMerEnn3månederSidenFamiliehendelse = dayjs(new Date())
        .subtract(3, 'month')
        .isSameOrAfter(grunnlag.familiehendelsesdato, 'day');

    return {
        passerer: dagerIgjenRundtFødsel <= 0 || erMerEnn3månederSidenFamiliehendelse,
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
