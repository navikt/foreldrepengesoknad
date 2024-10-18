import dayjs from 'dayjs';

import { Barn, Forelder, Periode, Situasjon, StønadskontoType, isUfødtBarn, isUttaksperiode } from '@navikt/fp-common';
import { Uttaksdagen } from '@navikt/fp-utils';
import { andreAugust2022ReglerGjelder } from '@navikt/fp-uttaksplan';

type DateType = Date | string | undefined;

export const getKanPeriodenRundtFødselJusteres = (periodeRundtFødsel: Periode, termindato: DateType): boolean => {
    return (
        termindato !== undefined &&
        isUttaksperiode(periodeRundtFødsel) &&
        dayjs(periodeRundtFødsel.tidsperiode.fom).isSame(
            Uttaksdagen(dayjs(termindato).toDate()).denneEllerNeste(),
            'day',
        ) &&
        periodeRundtFødsel.forelder === Forelder.farMedmor &&
        periodeRundtFødsel.konto === StønadskontoType.Fedrekvote &&
        periodeRundtFødsel.ønskerSamtidigUttak === true &&
        periodeRundtFødsel.ønskerFlerbarnsdager !== true
    );
};

export const getKanPerioderRundtFødselAutomatiskJusteres = (
    kanSøkersituasjonAutomatiskJustereRundtFødsel: boolean,
    perioderMedUttakRundtFødsel: Periode[],
    termindato: DateType,
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
    termindato: DateType,
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
