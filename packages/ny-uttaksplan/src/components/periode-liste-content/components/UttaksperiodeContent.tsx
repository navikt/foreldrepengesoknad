import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Forelder } from '@navikt/fp-constants';
import { MorsAktivitet } from '@navikt/fp-types';
import { TidsperiodenString, capitalizeFirstLetter, formatDateExtended } from '@navikt/fp-utils';
import { assertUnreachable } from '@navikt/fp-validation';

import { useUttaksplanData } from '../../../context/UttaksplanDataContext';
import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';

interface Props {
    periode: Planperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

export const UttaksperiodeContent = ({ periode, inneholderKunEnPeriode, navnPåForeldre, erFarEllerMedmor }: Props) => {
    const intl = useIntl();
    const { aleneOmOmsorg } = useUttaksplanData();

    const stønadskontoNavn = getStønadskontoNavn(
        intl,
        periode.kontoType!,
        navnPåForeldre,
        erFarEllerMedmor,
        aleneOmOmsorg,
    );

    return (
        <HStack gap="space-8">
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <VStack gap="space-4">
                <HStack gap="space-8">
                    <BodyShort weight="semibold">{getLengdePåPeriode(intl, inneholderKunEnPeriode, periode)}</BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </HStack>
                <VStack gap="space-8">
                    <BodyShort>{stønadskontoNavn}</BodyShort>
                    {periode.morsAktivitet !== undefined && (
                        <BodyShort>{getMorsAktivitetTekst(intl, periode.morsAktivitet)}</BodyShort>
                    )}
                    {periode.trekkdager !== undefined ? (
                        <BodyShort>
                            <FormattedMessage id="uttaksplan.periodeListeContent.eøs" />
                        </BodyShort>
                    ) : (
                        <BodyShort>
                            {getTekstForArbeidOgSamtidigUttak(periode, erFarEllerMedmor, navnPåForeldre)}
                        </BodyShort>
                    )}
                </VStack>
            </VStack>
        </HStack>
    );
};

const getLengdePåPeriode = (intl: IntlShape, inneholderKunEnPeriode: boolean, periode: Planperiode) => {
    if (inneholderKunEnPeriode) {
        return intl.formatMessage({ id: 'uttaksplan.varighet.helePerioden' });
    }

    return `${formatDateExtended(periode.fom)} - ${formatDateExtended(periode.tom)}`;
};

export const getMorsAktivitetTekst = (intl: IntlShape, aktivitet: MorsAktivitet): string => {
    switch (aktivitet) {
        case MorsAktivitet.Arbeid:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Arbeid' });
        case MorsAktivitet.ArbeidOgUtdanning:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.ArbeidOgUtdanning' });
        case MorsAktivitet.Innlagt:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Innlagt' });
        case MorsAktivitet.Introduksjonsprogrammet:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Introduksjonsprogrammet' });
        case MorsAktivitet.Kvalifiseringsprogrammet:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Kvalifiseringsprogrammet' });
        case MorsAktivitet.TrengerHjelp:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.TrengerHjelp' });
        case MorsAktivitet.Uføre:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Uføre' });
        case MorsAktivitet.Utdanning:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Utdanning' });
        case MorsAktivitet.IkkeOppgitt:
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.UtenAktivitetsKrav' });
        default:
            return assertUnreachable('Mor har ingen aktivitet');
    }
};

const getTekstForArbeidOgSamtidigUttak = (
    periode: Planperiode,
    erFarEllerMedmor: boolean,
    navnPåForeldre: NavnPåForeldre,
) => {
    if ((periode.gradering !== undefined && periode.samtidigUttak !== undefined) || periode.gradering !== undefined) {
        return <BodyShort>{getArbeidsTekst(periode.gradering.arbeidstidprosent)}</BodyShort>;
    }

    if (periode.samtidigUttak !== undefined) {
        return (
            <BodyShort>
                {getSamtidigUttakTekst(periode.samtidigUttak, periode.forelder!, erFarEllerMedmor, navnPåForeldre)}
            </BodyShort>
        );
    }

    return undefined;
};

const getArbeidsTekst = (arbeidstidprosent: number) => {
    const uttaksprosent = Math.round((100 - arbeidstidprosent) * 100) / 100;

    return (
        <FormattedMessage id="uttaksplan.periodeListeContent.arbeid" values={{ arbeidstidprosent, uttaksprosent }} />
    );
};

const getSamtidigUttakTekst = (
    samtidiguttaksProsent: number,
    forelderIPerioden: Forelder,
    erFarEllerMedmor: boolean,
    navnPåForeldre: NavnPåForeldre,
) => {
    const periodenGjelderSøker = erFarEllerMedmor
        ? forelderIPerioden === Forelder.farMedmor
        : forelderIPerioden === Forelder.mor;
    const navnPåAnnenForelderIPerioden = erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor;
    const navnPåHovedforelderIPerioden = erFarEllerMedmor ? navnPåForeldre.farMedmor : navnPåForeldre.mor;

    return periodenGjelderSøker ? (
        <FormattedMessage
            id="uttaksplan.periodeListeContent.samtidigUttak"
            values={{
                samtidiguttaksProsent,
                navnPåHovedforelderIPerioden: capitalizeFirstLetter(navnPåHovedforelderIPerioden),
            }}
        />
    ) : (
        <FormattedMessage
            id="uttaksplan.periodeListeContent.samtidigUttak.annenForelder"
            values={{
                navnPåAnnenForelderIPerioden: capitalizeFirstLetter(navnPåAnnenForelderIPerioden),
                samtidiguttaksProsent,
            }}
        />
    );
};
