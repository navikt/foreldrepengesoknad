import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';

import { FormSummary } from '@navikt/ds-react';

import {
    AnnenForelder,
    NavnPåForeldre,
    Periode,
    Periodetype,
    Situasjon,
    TidsperiodeDate,
    Uttaksperiode,
    isSkalIkkeHaForeldrepengerFørFødselPeriode,
} from '@navikt/fp-common';
import { EksternArbeidsforholdDto_fpoversikt, KontoTypeUttak } from '@navikt/fp-types';
import { capitalizeFirstLetter, formatDateMedUkedagShortMonth } from '@navikt/fp-utils';
import {
    appendPeriodeNavnHvisUttakRundtFødselFarMedmor,
    finnesPeriodeIOpprinneligPlan,
    getPeriodeTittel,
    uttaksperiodeKanJusteresVedFødsel,
} from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { Overføringsperiodedetaljer } from './detaljer/Overføringsperiodedetaljer';
import { Uttaksperiodedetaljer } from './detaljer/Uttaksperiodedetaljer';
import { Utsettelsesperiodedetaljer } from './detaljer/Uttsettelsesperiodedetaljer';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    erFarEllerMedmor: boolean;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    annenForelder: AnnenForelder;
    familiehendelsesdato: Date;
    termindato: string | undefined;
    situasjon: Situasjon;
    erAleneOmOmsorg: boolean;
    ønskerJustertUttakVedFødsel: boolean | undefined;
}

export const UttaksplanOppsummeringsliste = ({
    navnPåForeldre,
    erFarEllerMedmor,
    registrerteArbeidsforhold,
    annenForelder,
    familiehendelsesdato,
    termindato,
    situasjon,
    erAleneOmOmsorg,
    ønskerJustertUttakVedFødsel,
}: Props) => {
    const intl = useIntl();

    const perioder = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const eksisterendeUttaksplan = useContextGetData(ContextDataType.EKSISTERENDE_SAK)?.uttaksplan;

    const getStønadskontoNavnFromKonto = (konto: KontoTypeUttak) => {
        return getStønadskontoNavn(intl, konto, navnPåForeldre, erFarEllerMedmor, erAleneOmOmsorg);
    };

    const getUttaksperiodeNavn = (periode: Uttaksperiode) => {
        const tittel = getStønadskontoNavnFromKonto(periode.konto);
        return appendPeriodeNavnHvisUttakRundtFødselFarMedmor(
            intl,
            tittel,
            periode,
            situasjon,
            familiehendelsesdato,
            termindato ? dayjs(termindato).toDate() : undefined,
        );
    };

    const formatTidsperiode = (tidsperiode: TidsperiodeDate): string => {
        const formatertTidsperiode = intl.formatMessage(
            { id: 'tidsintervall' },
            {
                fom: capitalizeFirstLetter(formatDateMedUkedagShortMonth(tidsperiode.fom)),
                tom: formatDateMedUkedagShortMonth(tidsperiode.tom),
            },
        );
        if (uttaksperiodeKanJusteresVedFødsel(ønskerJustertUttakVedFødsel, termindato, tidsperiode.fom)) {
            const justeringTekst = intl.formatMessage({ id: 'oppsummering.uttak.periodenBlirAutomatiskJustert' });
            return justeringTekst.concat(formatertTidsperiode);
        }
        return formatertTidsperiode;
    };

    return (
        <>
            <FormSummary.Label>
                <FormattedMessage id="oppsummering.uttak.dine.perioder" />
            </FormSummary.Label>
            <FormSummary.Value>
                <FormSummary.Answers>
                    {perioder.map((periode) => {
                        const periodeErNyEllerEndret = eksisterendeUttaksplan
                            ? finnesPeriodeIOpprinneligPlan(periode, eksisterendeUttaksplan) === false
                            : true;

                        if (periode.type === Periodetype.Uttak) {
                            const tidsperiode = isSkalIkkeHaForeldrepengerFørFødselPeriode(periode)
                                ? intl.formatMessage({ id: 'uttaksplan.periodeliste.header.skalIkkeHaUttakFørTermin' })
                                : formatTidsperiode(periode.tidsperiode);
                            return (
                                <FormSummary.Answer key={periode.type + tidsperiode}>
                                    <FormSummary.Label>{tidsperiode}</FormSummary.Label>
                                    <FormSummary.Value>
                                        {getUttaksperiodeNavn(periode)}
                                        <Uttaksperiodedetaljer
                                            periode={periode}
                                            registrerteArbeidsforhold={registrerteArbeidsforhold}
                                            periodeErNyEllerEndret={periodeErNyEllerEndret}
                                            søkerErFarEllerMedmor={erFarEllerMedmor}
                                            annenForelder={annenForelder}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            );
                        }
                        if (periode.type === Periodetype.Utsettelse) {
                            return (
                                <FormSummary.Answer key={lagKeyFraPeriode(periode)}>
                                    <FormSummary.Label>{formatTidsperiode(periode.tidsperiode)}</FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage id="oppsummering.utsettelse.pga" />
                                        <Utsettelsesperiodedetaljer
                                            periode={periode}
                                            registrerteArbeidsforhold={registrerteArbeidsforhold}
                                            søkerErFarEllerMedmor={erFarEllerMedmor}
                                            annenForelder={annenForelder}
                                            periodeErNyEllerEndret={periodeErNyEllerEndret}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            );
                        }
                        if (periode.type === Periodetype.Overføring) {
                            return (
                                <FormSummary.Answer key={lagKeyFraPeriode(periode)}>
                                    <FormSummary.Label>{formatTidsperiode(periode.tidsperiode)}</FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage
                                            id="oppsummering.overtakelse.pga"
                                            values={{ konto: getStønadskontoNavnFromKonto(periode.konto) }}
                                        />
                                        <Overføringsperiodedetaljer periode={periode} navnPåForeldre={navnPåForeldre} />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            );
                        }
                        if (periode.type === Periodetype.Opphold) {
                            return (
                                <FormSummary.Answer key={lagKeyFraPeriode(periode)}>
                                    <FormSummary.Label>{formatTidsperiode(periode.tidsperiode)}</FormSummary.Label>
                                    <FormSummary.Value>
                                        {getPeriodeTittel(
                                            intl,
                                            periode,
                                            navnPåForeldre,
                                            familiehendelsesdato,
                                            termindato ? dayjs(termindato).toDate() : undefined,
                                            situasjon,
                                            erFarEllerMedmor,
                                        )}
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            );
                        }
                        return null;
                    })}
                </FormSummary.Answers>
            </FormSummary.Value>
        </>
    );
};

const lagKeyFraPeriode = (periode: Periode) =>
    periode.type + periode.tidsperiode.fom.toString() + periode.tidsperiode.tom.toString();
