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

import { Uttaksplanperiode } from '../../../types/UttaksplanPeriode';
import {
    erUttaksplanperiodeErForelderMor,
    erUttaksplanperiodeEøs,
    erUttaksplanperiodeFamiliehendelseDato,
    erUttaksplanperiodeSamtidigUttak,
    erUttaksplanperiodeTapteDager,
    erUttaksplanperiodeUtenUttak,
    erUttaksplanperiodeUtsettelse,
    getSisteUttaksplanperiodeTom,
    getUttaksplanperiodeForelder,
    getUttaksplanperiodeUtsettelseÅrsak,
    harUttaksplanperiodeAvslåttPeriodeMedÅrsakAnnet,
    harUttaksplanperiodePrematuruker,
} from '../../utils/uttaksplanperiodeUtils';

export const finnBakgrunnsfarge = (
    uttaksplanperioder: Uttaksplanperiode[],
    harMorsAktivitetIkkeErValgt: boolean,
    erFamiliehendelse?: boolean,
) => {
    if (erFamiliehendelse) {
        return 'bg-ax-danger-100';
    }

    if (harMorsAktivitetIkkeErValgt) {
        return 'bg-ax-danger-200';
    }

    if (erUttaksplanperiodeEøs(uttaksplanperioder)) {
        return 'bg-ax-success-400';
    }

    if (erUttaksplanperiodeTapteDager(uttaksplanperioder)) {
        return 'bg-ax-bg-neutral-moderate-hoverA';
    }

    if (erUttaksplanperiodeUtenUttak(uttaksplanperioder)) {
        return 'bg-ax-warning-200';
    }

    if (erUttaksplanperiodeSamtidigUttak(uttaksplanperioder)) {
        return 'bg-[linear-gradient(135deg,var(--ax-success-200)_0%,var(--ax-success-200)_50%,var(--ax-accent-100)_50%,var(--ax-accent-100)_100%)]';
    }

    if (erUttaksplanperiodeUtsettelse(uttaksplanperioder)) {
        return 'bg-ax-bg-default shadow-[inset_0_0_0_2px_var(--ax-accent-500)]';
    }

    if (erUttaksplanperiodeErForelderMor(uttaksplanperioder)) {
        return 'bg-ax-accent-100';
    }

    return 'bg-ax-success-200';
};

const getIkonFarge = (uttaksplanperiode: Uttaksplanperiode[], erFamiliehendelse?: boolean) => {
    if (erFamiliehendelse) {
        return 'text-ax-danger-600';
    }

    if (erUttaksplanperiodeTapteDager(uttaksplanperiode)) {
        return 'text-ax-neutral-800';
    }

    if (erUttaksplanperiodeUtenUttak(uttaksplanperiode)) {
        return 'text-ax-warning-400';
    }

    if (erUttaksplanperiodeUtsettelse(uttaksplanperiode)) {
        return 'text-ax-accent-500';
    }

    if (erUttaksplanperiodeErForelderMor(uttaksplanperiode)) {
        return 'text-ax-accent-500';
    }

    return 'text-ax-success-500';
};

export const getTekst = (
    intl: IntlShape,
    uttaksplanperioder: Uttaksplanperiode[],
    erFarEllerMedmor: boolean,
    navnPåForeldre: NavnPåForeldre,
    familiesituasjon: Familiesituasjon,
    erDeltUttak: boolean,
) => {
    const navnPåAnnenForelder = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const navnPåForelder = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;
    const forelder = getUttaksplanperiodeForelder(uttaksplanperioder);
    const erEgenPeriode = erFarEllerMedmor ? forelder === 'FAR_MEDMOR' : forelder == 'MOR';

    if (erUttaksplanperiodeEøs(uttaksplanperioder)) {
        return intl.formatMessage(
            { id: 'uttaksplan.periodeListeHeader.HarEøsForeldrepenger' },
            {
                navn: erEgenPeriode
                    ? capitalizeFirstLetter(navnPåForelder)
                    : capitalizeFirstLetter(navnPåAnnenForelder),
            },
        );
    }

    if (erUttaksplanperiodeFamiliehendelseDato(uttaksplanperioder)) {
        switch (familiesituasjon) {
            case 'adopsjon':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.adopsjon' });
            case 'fødsel':
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.fødsel' });
            default:
                return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.termin' });
        }
    }

    if (harUttaksplanperiodePrematuruker(uttaksplanperioder)) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.pleiepenger' });
    }
    if (harUttaksplanperiodeAvslåttPeriodeMedÅrsakAnnet(uttaksplanperioder)) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.avslåttAnnet' });
    }

    const utsettelseÅrsak = getUttaksplanperiodeUtsettelseÅrsak(uttaksplanperioder);
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

    if (erUttaksplanperiodeTapteDager(uttaksplanperioder)) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.dagerDuKanTape' });
    }

    if (erUttaksplanperiodeUtenUttak(uttaksplanperioder)) {
        return intl.formatMessage({ id: 'uttaksplan.periodeListeHeader.periodeUtenUttak' });
    }

    if (erUttaksplanperiodeSamtidigUttak(uttaksplanperioder)) {
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

export const getIkon = (uttaksplanperioder: Uttaksplanperiode[], familiehendelsedato: string) => {
    const periodeFørTermindato = dayjs(familiehendelsedato).isAfter(getSisteUttaksplanperiodeTom(uttaksplanperioder));

    const erFamiliehendelse = erUttaksplanperiodeFamiliehendelseDato(uttaksplanperioder);
    const ikonfarge = getIkonFarge(uttaksplanperioder, erFamiliehendelse);

    if (erFamiliehendelse) {
        return <HeartFillIcon className={ikonfarge} width={24} height={24} />;
    }

    if (erUttaksplanperiodeTapteDager(uttaksplanperioder) || harUttaksplanperiodePrematuruker(uttaksplanperioder)) {
        return <InformationSquareFillIcon className={ikonfarge} width={24} height={24} />;
    }

    const utsettelseÅrsak = getUttaksplanperiodeUtsettelseÅrsak(uttaksplanperioder);
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

    if (erUttaksplanperiodeUtenUttak(uttaksplanperioder)) {
        return <CloudFillIcon className={ikonfarge} width={24} height={24} />;
    }

    return <BabyWrappedFillIcon className={ikonfarge} width={24} height={24} />;
};

export const getBorderFarge = (uttaksplanperioder: Uttaksplanperiode[]) => {
    if (erUttaksplanperiodeEøs(uttaksplanperioder)) {
        return 'border-ax-success-400';
    }

    if (erUttaksplanperiodeFamiliehendelseDato(uttaksplanperioder)) {
        return 'border-ax-danger-100';
    }

    if (erUttaksplanperiodeTapteDager(uttaksplanperioder)) {
        return 'border-ax-bg-neutral-moderate-hoverA';
    }

    if (erUttaksplanperiodeUtenUttak(uttaksplanperioder)) {
        return 'border-ax-warning-200';
    }

    if (erUttaksplanperiodeSamtidigUttak(uttaksplanperioder)) {
        return 'border-ax-success-200 border-double';
    }

    if (erUttaksplanperiodeUtsettelse(uttaksplanperioder)) {
        return 'border-ax-accent-500';
    }

    if (erUttaksplanperiodeErForelderMor(uttaksplanperioder)) {
        return 'border-ax-accent-100';
    }

    return 'border-ax-success-200';
};
