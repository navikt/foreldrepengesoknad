import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { Uttaksdagen } from '@navikt/fp-utils';

import { Forelder, Periode, Situasjon, StønadskontoType, TidsperiodeDate, isUttaksperiode } from '../types';

export const ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL = 10;
const ANTALL_DAGER_TO_UKER = 2 * 7;
const ANTALL_DAGER_SEKS_UKER = 6 * 7;

const isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel = (periode: Periode): boolean => {
    return (
        isUttaksperiode(periode) &&
        periode.forelder === Forelder.farMedmor &&
        periode.konto === StønadskontoType.Fedrekvote &&
        !!periode.erMorForSyk === false &&
        periode.morsAktivitetIPerioden === undefined &&
        !!periode.ønskerFlerbarnsdager === false &&
        periode.ønskerSamtidigUttak === true
    );
};

const isUttaksperiodeFarMedmorPgaFødsel = (
    periode: Periode,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
): boolean => {
    return (
        isUttaksperiodeFarMedmorMedValgForUttakRundtFødsel(periode) &&
        starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode.tidsperiode,
            familiehendelsesdato,
            termindato,
        )
    );
};

const getFørsteUttaksdag2UkerFørFødsel = (familiehendelsesdato: Date, termindato: Date | undefined): Date => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato !== undefined
            ? dayjs(termindato).subtract(ANTALL_DAGER_TO_UKER, 'day')
            : dayjs(familiehendelsesdato).subtract(ANTALL_DAGER_TO_UKER, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato))!;
    return Uttaksdagen(datoÅRegneFra.toDate()).denneEllerNeste();
};

const getSisteUttaksdag6UkerEtterFødsel = (familiehendelsesdato: Date): Date => {
    const førsteUttaksdagForPeriodeEtterFødsel = Uttaksdagen(familiehendelsesdato).denneEllerNeste();
    return Uttaksdagen(
        dayjs(førsteUttaksdagForPeriodeEtterFødsel).add(ANTALL_DAGER_SEKS_UKER, 'day').toDate(),
    ).forrige();
};

const starterTidsperiodeEtter2UkerFørFødsel = (
    tidsperiode: any,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
): boolean => {
    const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    return dayjs(tidsperiode.fom).isSameOrAfter(førsteUttaksdagToUkerFørFødsel, 'day');
};

const starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel = (
    tidsperiode: TidsperiodeDate,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
) => {
    return (
        starterTidsperiodeEtter2UkerFørFødsel(tidsperiode, familiehendelsesdato, termindato) &&
        dayjs(tidsperiode.fom).isSameOrBefore(getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato), 'day')
    );
};

export const appendPeriodeNavnHvisUttakRundtFødselFarMedmor = (
    intl: IntlShape,
    periodeNavn: string,
    periode: Periode,
    situasjon: Situasjon,
    familiehendelsesdato: Date,
    termindato: Date | undefined,
): string => {
    return situasjon === 'fødsel' && isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
        ? periodeNavn + intl.formatMessage({ id: 'rundtFødsel' })
        : periodeNavn;
};
