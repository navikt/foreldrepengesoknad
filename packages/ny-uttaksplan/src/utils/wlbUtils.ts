import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

import { ISO_DATE_FORMAT } from '@navikt/fp-constants';
import { Tidsperiode } from '@navikt/fp-types';
import { UttaksdagenString } from '@navikt/fp-utils';

dayjs.extend(minMax);

export const ANTALL_UTTAKSDAGER_FAR_MEDMOR_RUNDT_FØDSEL = 10;
const ANTALL_DAGER_TO_UKER = 2 * 7;
const ANTALL_DAGER_SEKS_UKER = 6 * 7;
const ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL = 3;

const getSisteUttaksdag6UkerEtterFødsel = (familiehendelsesdato: string): string => {
    const førsteUttaksdagForPeriodeEtterFødsel = UttaksdagenString(familiehendelsesdato).denneEllerNeste();
    return UttaksdagenString(
        dayjs(førsteUttaksdagForPeriodeEtterFødsel).add(ANTALL_DAGER_SEKS_UKER, 'day').format(ISO_DATE_FORMAT),
    ).forrige();
};

export const getFørsteUttaksdag2UkerFørFødsel = (
    familiehendelsesdato: string,
    termindato: string | undefined,
): string => {
    const terminEllerFamHendelsesdatoMinusToUker =
        termindato !== undefined
            ? dayjs(termindato).subtract(ANTALL_DAGER_TO_UKER, 'day')
            : dayjs(familiehendelsesdato).subtract(ANTALL_DAGER_TO_UKER, 'day');
    const datoÅRegneFra = dayjs.min(terminEllerFamHendelsesdatoMinusToUker, dayjs(familiehendelsesdato))!;
    return UttaksdagenString(datoÅRegneFra.format(ISO_DATE_FORMAT)).denneEllerNeste();
};

const getFørsteUttaksdagPåEllerEtterFødsel = (familiehendelsesdato: string) => {
    return UttaksdagenString(familiehendelsesdato).denneEllerNeste();
};

export const getFørsteUttaksdagForeldrepengerFørFødsel = (familiehendelsesdato: string | undefined): string => {
    if (!familiehendelsesdato) {
        throw new Error('Mangler informasjon om familiehendelsesdato.');
    }
    return UttaksdagenString(getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)).trekkFra(
        ANTALL_UKER_FORELDREPENGER_FØR_FØDSEL * 5,
    );
};

const starterTidsperiodeEtter2UkerFørFødsel = (
    tidsperiode: any,
    familiehendelsesdato: string,
    termindato: string | undefined,
): boolean => {
    const førsteUttaksdagToUkerFørFødsel = getFørsteUttaksdag2UkerFørFødsel(familiehendelsesdato, termindato);
    return dayjs(tidsperiode.fom).isSameOrAfter(førsteUttaksdagToUkerFørFødsel, 'day');
};

export const starterTidsperiodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel = (
    tidsperiode: Tidsperiode,
    familiehendelsesdato: string,
    termindato: string | undefined,
) => {
    return (
        starterTidsperiodeEtter2UkerFørFødsel(tidsperiode, familiehendelsesdato, termindato) &&
        dayjs(tidsperiode.fom).isSameOrBefore(getSisteUttaksdag6UkerEtterFødsel(familiehendelsesdato), 'day')
    );
};
