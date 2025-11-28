import {
    BabyWrappedFillIcon,
    BandageFillIcon,
    BriefcaseFillIcon,
    CloudFillIcon,
    HeartFillIcon,
    InformationSquareFillIcon,
    ParasolBeachFillIcon,
    PersonPregnantFillIcon,
} from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { IntlShape } from 'react-intl';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Familiesituasjon } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';

export const finnBakgrunnsfarge = (permisjonsperiode: Permisjonsperiode, erFamiliehendelse?: boolean) => {
    const { erUtsettelse, erHull, forelder } = permisjonsperiode;
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;
    const erSamtidigUttak = !!permisjonsperiode.samtidigUttak;
    const erMor = forelder === 'MOR';

    if (erFamiliehendelse) {
        return 'bg-ax-danger-100';
    }

    if (erHull) {
        return 'bg-ax-bg-neutral-moderate-hoverA';
    }

    if (erPeriodeUtenUttak) {
        return 'bg-ax-warning-200';
    }

    if (erSamtidigUttak) {
        return 'bg-[linear-gradient(135deg,var(--ax-success-200)_0%,var(--ax-success-200)_50%,var(--ax-accent-100)_50%,var(--ax-accent-100)_100%)]';
    }

    if (erUtsettelse) {
        return 'bg-ax-bg-default shadow-[inset_0_0_0_2px_var(--ax-accent-500)]';
    }

    if (erMor) {
        return 'bg-ax-accent-100';
    }

    return 'bg-ax-success-200';
};

const getIkonFarge = (permisjonsperiode: Permisjonsperiode, erFamiliehendelse?: boolean) => {
    const { forelder, erUtsettelse, erHull } = permisjonsperiode;
    const erMor = forelder === 'MOR';
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;

    const utsettelseÅrsak =
        erUtsettelse && !permisjonsperiode.perioder[0]!.erAnnenPartEøs
            ? permisjonsperiode.perioder[0]!.utsettelseÅrsak
            : undefined;

    if (erFamiliehendelse) {
        return 'text-ax-danger-600';
    }

    if (erHull) {
        return 'text-ax-neutral-800';
    }

    if (erPeriodeUtenUttak) {
        return 'text-ax-warning-400';
    }

    if (utsettelseÅrsak !== undefined) {
        return 'text-ax-accent-500';
    }

    if (erMor) {
        return 'text-ax-accent-500';
    }

    return 'text-ax-success-500';
};

export const getTekst = (
    intl: IntlShape,
    permisjonsperiode: Permisjonsperiode,
    erFarEllerMedmor: boolean,
    navnPåForeldre: NavnPåForeldre,
    familiesituasjon: Familiesituasjon,
    erDeltUttak: boolean,
    erFamiliehendelse?: boolean,
) => {
    const { erUtsettelse, erHull, forelder } = permisjonsperiode;
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;

    const erSamtidigUttak = !!permisjonsperiode.samtidigUttak;
    const utsettelseÅrsak =
        erUtsettelse && !permisjonsperiode.perioder[0]!.erAnnenPartEøs
            ? permisjonsperiode.perioder[0]!.utsettelseÅrsak
            : undefined;
    const erPrematuruker =
        !permisjonsperiode.perioder[0]!.erAnnenPartEøs &&
        permisjonsperiode.perioder[0]!.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';

    const navnPåAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const navnPåForelder = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    const erEgenPeriode = erFarEllerMedmor ? forelder === 'FAR_MEDMOR' : forelder == 'MOR';

    if (erFamiliehendelse) {
        switch (familiesituasjon) {
            case 'adopsjon':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.adopsjon' });
            case 'fødsel':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.fødsel' });
            default:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.termin' });
        }
    }

    if (utsettelseÅrsak !== undefined) {
        switch (utsettelseÅrsak) {
            case 'SØKER_INNLAGT':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.instutisjonSøker' });
            case 'SØKER_SYKDOM':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.sykdom' });
            case 'BARN_INNLAGT':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.instutisjonBarn' });
            case 'ARBEID':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.arbeid' });
            case 'LOVBESTEMT_FERIE':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.ferie' });
            case 'HV_ØVELSE':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.hvØvelse' });
            case 'NAV_TILTAK':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.navTiltak' });
            case 'FRI':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.fri' });
        }
    }

    if (erPrematuruker) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.pleiepenger' });
    }

    if (erHull) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.dagerDuKanTape' });
    }

    if (erPeriodeUtenUttak) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.periodeUtenUttak' });
    }

    if (erSamtidigUttak) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.samtidigUttak' });
    }

    if (!erDeltUttak) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.DuHarForeldrepenger' });
    }

    return intl.formatMessage(
        { id: 'uttaksplan.periodeListeHeader.HarForeldrepenger' },
        {
            navn: erEgenPeriode ? capitalizeFirstLetter(navnPåForelder) : capitalizeFirstLetter(navnPåAnnenForelder),
        },
    );
};

export const getIkon = (
    permisjonsperiode: Permisjonsperiode,
    familiehendelsedato: string,
    erFamiliehendelse?: boolean,
) => {
    const { erUtsettelse, erHull } = permisjonsperiode;
    const periodeFørTermindato = dayjs(familiehendelsedato).isAfter(permisjonsperiode.tidsperiode.tom);
    const utsettelseÅrsak =
        erUtsettelse && !permisjonsperiode.perioder[0]!.erAnnenPartEøs
            ? permisjonsperiode.perioder[0]!.utsettelseÅrsak
            : undefined;
    const isPrematuruker =
        !permisjonsperiode.perioder[0]!.erAnnenPartEøs &&
        permisjonsperiode.perioder[0]!.resultat?.årsak === 'AVSLAG_FRATREKK_PLEIEPENGER';
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;

    const ikonfarge = getIkonFarge(permisjonsperiode, erFamiliehendelse);

    if (erFamiliehendelse) {
        return <HeartFillIcon className={ikonfarge} width={24} height={24} />;
    }

    if (erHull || isPrematuruker) {
        return <InformationSquareFillIcon className={ikonfarge} width={24} height={24} />;
    }

    if (utsettelseÅrsak !== undefined) {
        if (utsettelseÅrsak === 'ARBEID' || utsettelseÅrsak === 'FRI') {
            return <BriefcaseFillIcon className={ikonfarge} width={24} height={24} />;
        }

        if (utsettelseÅrsak === 'LOVBESTEMT_FERIE') {
            return <ParasolBeachFillIcon className={ikonfarge} width={24} height={24} />;
        }

        return <BandageFillIcon className={ikonfarge} width={24} height={24} />;
    }

    if (periodeFørTermindato) {
        return <PersonPregnantFillIcon className={ikonfarge} width={24} height={24} />;
    }

    if (erPeriodeUtenUttak) {
        return <CloudFillIcon className={ikonfarge} width={24} height={24} />;
    }

    return <BabyWrappedFillIcon className={ikonfarge} width={24} height={24} />;
};

export const getBorderFarge = (permisjonsperiode: Permisjonsperiode, erFamiliehendelse?: boolean) => {
    const { erUtsettelse, erHull, forelder } = permisjonsperiode;
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;
    const erSamtidigUttak = !!permisjonsperiode.samtidigUttak;
    const erMor = forelder === 'MOR';

    if (erFamiliehendelse) {
        return 'border-ax-danger-100';
    }

    if (erHull) {
        return 'border-ax-bg-neutral-moderate-hoverA';
    }

    if (erPeriodeUtenUttak) {
        return 'border-ax-warning-200';
    }

    if (erSamtidigUttak) {
        return 'border-ax-success-200 border-double';
    }

    if (erUtsettelse) {
        return 'border-ax-accent-500';
    }

    if (erMor) {
        return 'border-ax-accent-100';
    }

    return 'border-ax-success-200';
};
