import Barn, { isUfødtBarn } from 'app/context/types/Barn';
import { Forelder } from 'app/types/Forelder';
import { Situasjon } from 'app/types/Situasjon';
import { andreAugust2022ReglerGjelder } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';

export const getKanPeriodenRundtFødselJusteres = (
    periodeRundtFødsel: Periode,
    termindato: Date | undefined
): boolean => {
    return (
        termindato !== undefined &&
        isUttaksperiode(periodeRundtFødsel) &&
        dayjs(periodeRundtFødsel.tidsperiode.fom).isSame(termindato, 'day') &&
        periodeRundtFødsel.forelder === Forelder.farMedmor &&
        periodeRundtFødsel.konto === StønadskontoType.Fedrekvote &&
        periodeRundtFødsel.ønskerSamtidigUttak === true
    );
};

export const getKanJustereAutomatiskVedFødsel = (
    perioderMedUttakRundtFødsel: Periode[],
    termindato: Date | undefined
): boolean => {
    return (
        perioderMedUttakRundtFødsel.length === 1 &&
        getKanPeriodenRundtFødselJusteres(perioderMedUttakRundtFødsel[0], termindato)
    );
};

export const getVisAutomatiskJusteringForm = (
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    situasjon: Situasjon,
    perioderMedUttakRundtFødsel: Periode[],
    barn: Barn,
    termindato: Date | undefined,
    bareFarHarRett: boolean
): boolean => {
    return (
        erFarEllerMedmor &&
        andreAugust2022ReglerGjelder(familiehendelsesdato) &&
        situasjon === 'fødsel' &&
        perioderMedUttakRundtFødsel.length !== 0 &&
        isUfødtBarn(barn) &&
        termindato !== undefined &&
        !bareFarHarRett
    );
};
