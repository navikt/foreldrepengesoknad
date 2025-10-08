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
import { Forelder } from '@navikt/fp-constants';
import { Familiesituasjon, PeriodeResultatÅrsak, UtsettelseÅrsakType } from '@navikt/fp-types';
import { capitalizeFirstLetter } from '@navikt/fp-utils';

import { Permisjonsperiode } from '../../types/Permisjonsperiode';

export const finnBakgrunnsfarge = (permisjonsperiode: Permisjonsperiode, erFamiliehendelse?: boolean) => {
    const { erUtsettelse, erHull, forelder } = permisjonsperiode;
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;
    const erSamtidigUttak = !!permisjonsperiode.samtidigUttak;
    const erMor = forelder === Forelder.mor;

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
    const erMor = forelder === Forelder.mor;
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;

    const utsettelseÅrsak = erUtsettelse ? permisjonsperiode.perioder[0].utsettelseÅrsak : undefined;

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
    erFamiliehendelse?: boolean,
) => {
    const { erUtsettelse, erHull, forelder } = permisjonsperiode;
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;

    const erSamtidigUttak = !!permisjonsperiode.samtidigUttak;
    const utsettelseÅrsak = erUtsettelse ? permisjonsperiode.perioder[0].utsettelseÅrsak : undefined;
    const erPrematuruker =
        permisjonsperiode.perioder[0].resultat?.årsak === PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER;

    const navnPåAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const navnPåForelder = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    const erEgenPeriode = erFarEllerMedmor ? forelder === Forelder.farMedmor : forelder == Forelder.mor;

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
            case UtsettelseÅrsakType.InstitusjonSøker:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.instutisjonSøker' });
            case UtsettelseÅrsakType.Sykdom:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.sykdom' });
            case UtsettelseÅrsakType.InstitusjonBarnet:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.instutisjonBarn' });
            case UtsettelseÅrsakType.Arbeid:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.arbeid' });
            case UtsettelseÅrsakType.Ferie:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.ferie' });
            case UtsettelseÅrsakType.HvØvelse:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.hvØvelse' });
            case UtsettelseÅrsakType.NavTiltak:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.navTiltak' });
            case UtsettelseÅrsakType.Fri:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.fri' });
        }
    }

    if (erPrematuruker) {
        return 'Avslåtte foreldrepenger';
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
    const utsettelseÅrsak = erUtsettelse ? permisjonsperiode.perioder[0].utsettelseÅrsak : undefined;
    const isPrematuruker =
        permisjonsperiode.perioder[0].resultat?.årsak === PeriodeResultatÅrsak.AVSLAG_FRATREKK_PLEIEPENGER;
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
        if (utsettelseÅrsak === UtsettelseÅrsakType.Arbeid || utsettelseÅrsak === UtsettelseÅrsakType.Fri) {
            return <BriefcaseFillIcon className={ikonfarge} width={24} height={24} />;
        }

        if (utsettelseÅrsak === UtsettelseÅrsakType.Ferie) {
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
    const erMor = forelder === Forelder.mor;

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
