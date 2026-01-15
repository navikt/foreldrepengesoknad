import { IntlShape } from 'react-intl';

import { NavnPåForeldre } from '@navikt/fp-common';
import {
    KontoType,
    KontoTypeUttak,
    MorsAktivitet,
    UttakOppholdÅrsak_fpoversikt,
    UttakUtsettelseÅrsak_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetter, getNavnGenitivEierform } from '@navikt/fp-utils';

import {
    Uttaksplanperiode,
    erEøsUttakPeriode,
    erFamiliehendelseDato,
    erPeriodeUtenUttakHull,
    erTapteDagerHull,
} from '../../types/UttaksplanPeriode';

export const getStønadskontoNavnSimple = (intl: IntlShape, konto: KontoTypeUttak, erMedmorDelAvSøknaden?: boolean) => {
    if (konto === 'FEDREKVOTE' && erMedmorDelAvSøknaden) {
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.MEDMORSKVOTE' });
    }
    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
};

export const getStønadskontoNavn = (
    intl: IntlShape,
    navnPåForeldre: NavnPåForeldre,
    erFarEllerMedmor: boolean,
    morsAktivitet: MorsAktivitet | undefined,
    konto?: KontoType,
    erAleneOmOmsorg?: boolean,
) => {
    let navn;

    switch (konto) {
        case 'MØDREKVOTE':
            navn = navnPåForeldre.mor;
            break;
        case 'FEDREKVOTE':
            navn = navnPåForeldre.farMedmor;
            break;
        default:
            navn = undefined;
    }

    if (navn) {
        return intl.formatMessage(
            { id: 'uttaksplan.stønadskontotype.foreldernavn.kvote' },
            { navn: getNavnGenitivEierform(capitalizeFirstLetter(navn), intl.locale) },
        );
    }

    if (erFarEllerMedmor === true && erAleneOmOmsorg === false) {
        if (morsAktivitet === 'IKKE_OPPGITT') {
            return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSFRI_KVOTE_BFHR' });
        }
        return intl.formatMessage({ id: 'uttaksplan.stønadskontotype.AKTIVITETSKRAV_KVOTE_BFHR' });
    }

    return intl.formatMessage({ id: `uttaksplan.stønadskontotype.${konto}` });
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

export const genererPeriodeKey = (saksperiode?: Uttaksplanperiode): string | undefined => {
    if (!saksperiode) {
        return undefined;
    }

    if (erEøsUttakPeriode(saksperiode)) {
        const { fom, tom, kontoType, trekkdager } = saksperiode;
        return `erAnnenPartEøs - ${fom} - ${tom} - ${kontoType} - ${trekkdager}`;
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
