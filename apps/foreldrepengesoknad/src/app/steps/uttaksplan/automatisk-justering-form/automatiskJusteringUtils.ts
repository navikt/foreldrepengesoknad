import {
    Barn,
    Forelder,
    Periode,
    Situasjon,
    StønadskontoType,
    Uttaksdagen,
    andreAugust2022ReglerGjelder,
    isUfødtBarn,
    isUttaksperiode,
} from '@navikt/fp-common';
import dayjs from 'dayjs';

export const getKanPeriodenRundtFødselJusteres = (
    periodeRundtFødsel: Periode,
    termindato: Date | undefined,
): boolean => {
    return (
        termindato !== undefined &&
        isUttaksperiode(periodeRundtFødsel) &&
        dayjs(periodeRundtFødsel.tidsperiode.fom).isSame(Uttaksdagen(termindato).denneEllerNeste(), 'day') &&
        periodeRundtFødsel.forelder === Forelder.farMedmor &&
        periodeRundtFødsel.konto === StønadskontoType.Fedrekvote &&
        periodeRundtFødsel.ønskerSamtidigUttak === true &&
        periodeRundtFødsel.ønskerFlerbarnsdager !== true
    );
};

export const getKanPerioderRundtFødselAutomatiskJusteres = (
    kanSøkersituasjonAutomatiskJustereRundtFødsel: boolean,
    perioderMedUttakRundtFødsel: Periode[],
    termindato: Date | undefined,
): boolean => {
    return (
        kanSøkersituasjonAutomatiskJustereRundtFødsel &&
        perioderMedUttakRundtFødsel.length === 1 &&
        getKanPeriodenRundtFødselJusteres(perioderMedUttakRundtFødsel[0], termindato)
    );
};

export const getKanSøkersituasjonAutomatiskJustereRundtFødsel = (
    erFarEllerMedmor: boolean,
    familiehendelsesdato: Date,
    situasjon: Situasjon,
    perioderMedUttakRundtFødsel: Periode[],
    barn: Barn,
    termindato: Date | undefined,
    bareFarHarRett: boolean,
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
