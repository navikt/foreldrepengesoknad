import dayjs from 'dayjs';
import isoWeekday from 'dayjs/plugin/isoWeek';
import { IntlShape } from 'react-intl';

import { UttakOppholdÅrsak_fpoversikt, UttakUtsettelseÅrsak_fpoversikt } from '@navikt/fp-types';
import { capitalizeFirstLetter, slutterTidsperiodeInnen6UkerEtterFødsel } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    UttaksplanperiodeMedKunTapteDager,
    erEøsUttakPeriode,
    erFamiliehendelseDato,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
    erVanligUttakPeriode,
} from '../types/UttaksplanPeriode';

dayjs.extend(isoWeekday);

export const isUttaksperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.utsettelseÅrsak === undefined;
};

export const isPrematuruker = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.kontoType !== undefined &&
        periode.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const isUtsettelsesperiode = (periode: Uttaksplanperiode) => {
    return (
        erVanligUttakPeriode(periode) &&
        periode.utsettelseÅrsak !== undefined &&
        periode.resultat?.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
};

export const isOverføringsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.overføringÅrsak !== undefined;
};

export const isOppholdsperiode = (periode: Uttaksplanperiode) => {
    return erVanligUttakPeriode(periode) && periode.oppholdÅrsak !== undefined;
};

export const isAvslåttPeriode = (periode: Uttaksplanperiode) => {
    return 'resultat' in periode && periode.resultat && periode.resultat.innvilget !== true;
};

export const isTapteDager = (periode: Uttaksplanperiode) => {
    return erTapteDagerHull(periode);
};

export const isPeriodeUtenUttak = (periode: Uttaksplanperiode) => {
    return erPeriodeUtenUttakHull(periode);
};

export const getOppholdskontoNavn = (
    intl: IntlShape,
    årsak: UttakOppholdÅrsak_fpoversikt,
    foreldernavn: string,
    erMor: boolean,
) => {
    const navn = capitalizeFirstLetter(foreldernavn);

    if (erMor) {
        if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FELLESPERIODE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }
        if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
            return intl.formatMessage(
                { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.FEDREKVOTE_ANNEN_FORELDER` },
                { foreldernavn: navn },
            );
        }

        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.far.MØDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }

    if (årsak === 'FELLESPERIODE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FELLESPERIODE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }
    if (årsak === 'FEDREKVOTE_ANNEN_FORELDER') {
        return intl.formatMessage(
            { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.FEDREKVOTE_ANNEN_FORELDER` },
            { foreldernavn: navn },
        );
    }

    return intl.formatMessage(
        { id: `uttaksplan.oppholdsårsaktype.foreldernavn.mor.MØDREKVOTE_ANNEN_FORELDER` },
        { foreldernavn: navn },
    );
};

export const finnTekstForUtsettelseÅrsak = (intl: IntlShape, utsettelseÅrsak: UttakUtsettelseÅrsak_fpoversikt) => {
    switch (utsettelseÅrsak) {
        case 'ARBEID':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.ARBEID' });
        case 'LOVBESTEMT_FERIE':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.LOVBESTEMT_FERIE' });
        case 'FRI':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.FRI' });
        case 'HV_ØVELSE':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.HV_ØVELSE' });
        case 'BARN_INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.BARN_INNLAGT' });
        case 'SØKER_INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_INNLAGT' });
        case 'NAV_TILTAK':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.NAV_TILTAK' });
        case 'SØKER_SYKDOM':
            return intl.formatMessage({ id: 'uttaksplan.utsettelsesårsak.SØKER_SYKDOM' });
    }
};

export const genererPeriodeId = (saksperiode?: Uttaksplanperiode): string | undefined => {
    if (!saksperiode) {
        return undefined;
    }

    if (erEøsUttakPeriode(saksperiode)) {
        const { fom, tom, kontoType, trekkdager } = saksperiode;
        return `erAnnenPartEøs - ${fom} - ${tom} - ${kontoType} - ${trekkdager} `;
    }
    if (erTapteDagerHull(saksperiode)) {
        const { fom, tom, forelder } = saksperiode;
        return `tapteDagerHull - ${fom} - ${tom} - ${forelder}`;
    }
    if (erPeriodeUtenUttakHull(saksperiode)) {
        const { fom, tom } = saksperiode;
        return `periodeUtenUttakHull - ${fom} - ${tom}`;
    }
    if (erFamiliehendelseDato(saksperiode)) {
        const { fom, tom } = saksperiode;
        return `familiehendelseDato - ${fom} - ${tom}`;
    }

    const { fom, tom, kontoType, flerbarnsdager, utsettelseÅrsak, forelder, oppholdÅrsak, overføringÅrsak } =
        saksperiode;
    return `${fom} - ${tom} - ${kontoType} - ${flerbarnsdager} - ${utsettelseÅrsak} - ${forelder} - ${oppholdÅrsak} - ${overføringÅrsak}`;
};

export const isAvslåttPeriodeFørsteSeksUkerMor = (
    periode: Uttaksplanperiode,
    familiehendelsesdato: string,
): boolean => {
    return (
        !!isAvslåttPeriode(periode) &&
        'forelder' in periode &&
        periode.forelder === 'MOR' &&
        dayjs(periode.fom).isSameOrAfter(dayjs(familiehendelsesdato), 'day') &&
        slutterTidsperiodeInnen6UkerEtterFødsel({ fom: periode.fom, tom: periode.tom }, new Date(familiehendelsesdato))
    );
};

export const getIndexOfSistePeriodeFørDato = (uttaksplan: Uttaksplanperiode[], dato: string | undefined) => {
    if (dato !== undefined) {
        return Math.max(0, uttaksplan.filter((p) => dayjs(p.tom).isBefore(dato, 'day')).length);
    }
    return undefined;
};
export const getAnnenForelderSamtidigUttakPeriode = (
    periode: Uttaksplanperiode,
    perioder: Uttaksplanperiode[],
): Uttaksplanperiode | undefined => {
    if (isUttaksperiode(periode)) {
        const samtidigUttak = perioder
            .filter(
                (p) =>
                    'forelder' in p &&
                    'forelder' in periode &&
                    p.forelder !== periode.forelder &&
                    isUttaksperiode(periode),
            )
            .find((p) => dayjs(periode.fom).isSame(p.fom));

        return samtidigUttak;
    }

    return undefined;
};

export const filtrerBortAnnenPartsIdentiskePerioder = (
    uttaksplanperiode: UttaksplanperiodeMedKunTapteDager[],
    erFarEllerMedmor: boolean,
) =>
    uttaksplanperiode.reduce<UttaksplanperiodeMedKunTapteDager[]>((alle, periode) => {
        const erSøkersPeriode = erPeriodeForSøker(periode, erFarEllerMedmor);
        const filtrerte = uttaksplanperiode.filter((p) => p.fom === periode.fom && p.tom === periode.tom);
        return filtrerte.length > 1 && !erSøkersPeriode ? alle : alle.concat(periode);
    }, []);

const erPeriodeForSøker = (periode: Uttaksplanperiode, erFarEllerMedmor: boolean) =>
    erVanligUttakPeriode(periode) &&
    ((periode.forelder === 'MOR' && !erFarEllerMedmor) || (periode.forelder === 'FAR_MEDMOR' && erFarEllerMedmor));
