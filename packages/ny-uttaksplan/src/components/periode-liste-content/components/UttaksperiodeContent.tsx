import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { BrukerRolleSak_fpoversikt, MorsAktivitet } from '@navikt/fp-types';
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
                    {/* @ts-expect-error temp */}
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
        case 'ARBEID':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Arbeid' });
        case 'ARBEID_OG_UTDANNING':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.ArbeidOgUtdanning' });
        case 'INNLAGT':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Innlagt' });
        case 'INTROPROG':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Introduksjonsprogrammet' });
        case 'KVALPROG':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Kvalifiseringsprogrammet' });
        case 'TRENGER_HJELP':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.TrengerHjelp' });
        case 'UFØRE':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Uføre' });
        case 'UTDANNING':
            return intl.formatMessage({ id: 'uttaksplan.periodeListeContent.morsAktivitet.Utdanning' });
        case 'IKKE_OPPGITT':
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
    forelderIPerioden: BrukerRolleSak_fpoversikt,
    erFarEllerMedmor: boolean,
    navnPåForeldre: NavnPåForeldre,
) => {
    const periodenGjelderSøker = erFarEllerMedmor ? forelderIPerioden === 'FAR_MEDMOR' : forelderIPerioden === 'MOR';
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
