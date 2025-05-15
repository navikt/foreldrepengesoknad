import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { Forelder } from '@navikt/fp-constants';
import { MorsAktivitet } from '@navikt/fp-types';
import { TidsperiodenString, formatDateExtended } from '@navikt/fp-utils';
import { assertUnreachable, notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../../context/UttaksplanDataContext';
import { Planperiode } from '../../../types/Planperiode';
import { getVarighetString } from '../../../utils/dateUtils';
import { getStønadskontoNavn } from '../../../utils/stønadskontoerUtils';

interface Props {
    periode: Planperiode;
    inneholderKunEnPeriode: boolean;
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
}

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

    return periodenGjelderSøker ? (
        <FormattedMessage id="uttaksplan.periodeListeContent.samtidigUttak" values={{ samtidiguttaksProsent }} />
    ) : (
        <FormattedMessage
            id="uttaksplan.periodeListeContent.samtidigUttak.annenForelder"
            values={{ navnPåAnnenForelderIPerioden, samtidiguttaksProsent }}
        />
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

export const UttaksperiodeContent = ({ periode, inneholderKunEnPeriode, navnPåForeldre, erFarEllerMedmor }: Props) => {
    const intl = useIntl();
    const erAleneOmOmsorg = notEmpty(useContextGetData(UttaksplanContextDataType.ALENE_OM_OMSORG));
    const stønadskontoNavn = getStønadskontoNavn(
        intl,
        periode.kontoType!,
        navnPåForeldre,
        erFarEllerMedmor,
        erAleneOmOmsorg,
    );

    return (
        <div style={{ marginBottom: '2rem', display: 'flex' }}>
            <div>
                <CalendarIcon width={24} height={24} />
            </div>
            <div>
                <div style={{ display: 'flex', marginLeft: '1rem', gap: '1rem' }}>
                    <BodyShort weight="semibold">{getLengdePåPeriode(intl, inneholderKunEnPeriode, periode)}</BodyShort>
                    <BodyShort>
                        {getVarighetString(
                            TidsperiodenString({ fom: periode.fom, tom: periode.tom }).getAntallUttaksdager(),
                            intl,
                        )}
                    </BodyShort>
                </div>
                <div style={{ marginLeft: '1rem', paddingTop: '0.25rem' }}>
                    <BodyShort>{stønadskontoNavn}</BodyShort>
                    {periode.morsAktivitet !== undefined && (
                        <BodyShort>{getMorsAktivitetTekst(intl, periode.morsAktivitet)}</BodyShort>
                    )}
                    {periode.gradering !== undefined && (
                        <BodyShort>{getArbeidsTekst(periode.gradering.arbeidstidprosent)}</BodyShort>
                    )}
                    {periode.samtidigUttak !== undefined && (
                        <BodyShort>
                            {getSamtidigUttakTekst(
                                periode.samtidigUttak,
                                periode.forelder!,
                                erFarEllerMedmor,
                                navnPåForeldre,
                            )}
                        </BodyShort>
                    )}
                </div>
            </div>
        </div>
    );
};
