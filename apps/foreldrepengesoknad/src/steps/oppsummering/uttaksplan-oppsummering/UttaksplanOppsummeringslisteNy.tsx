import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTermindato } from 'utils/barnUtils';
import { erPeriodeIOpprinneligPlan } from 'utils/eksisterendeSakUtils';
import { getErSøkerFarEllerMedmor, getNavnPåForeldre } from 'utils/personUtils';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';

import { FormSummary } from '@navikt/ds-react';

import { isAnnenForelderOppgitt, isSkalIkkeHaForeldrepengerFørFødselPeriode } from '@navikt/fp-common';
import { Periodetype } from '@navikt/fp-constants';
import {
    EksternArbeidsforholdDto_fpoversikt,
    KontoTypeUttak,
    NavnPåForeldre,
    Periode,
    TidsperiodeDate,
    Uttaksperiode,
} from '@navikt/fp-types';
import {
    ISOStringToDate,
    capitalizeFirstLetter,
    formatDateMedUkedagShortMonth,
    getFamiliehendelsedato,
} from '@navikt/fp-utils';
import {
    finnesPeriodeIOpprinneligPlan,
    getPeriodeTittel,
    uttaksperiodeKanJusteresVedFødsel,
} from '@navikt/fp-uttaksplan';
import { isUttaksperiodeFarMedmorPgaFødsel } from '@navikt/fp-uttaksplan/src/utils/wlbUtils';
import { notEmpty } from '@navikt/fp-validation';

import { Overføringsperiodedetaljer } from './detaljer/Overføringsperiodedetaljer';
import { Uttaksperiodedetaljer } from './detaljer/Uttaksperiodedetaljer';
import { Utsettelsesperiodedetaljer } from './detaljer/Uttsettelsesperiodedetaljer';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}

export const UttaksplanOppsummeringslisteNy = ({ navnPåForeldre, registrerteArbeidsforhold }: Props) => {
    const intl = useIntl();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_NY));
    const valgtEksisterendeSaksnr = notEmpty(useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR));
    const { ønskerJustertUttakVedFødsel } = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA_NY));

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const sak = sakerQuery.data?.foreldrepenger.find((s) => s.saksnummer === valgtEksisterendeSaksnr);

    const familiehendelsesdato = notEmpty(getFamiliehendelsedato(barn));

    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder);

    const erAleneOmOmsorg = erAnnenForelderOppgitt ? annenForelder?.erAleneOmOmsorg : false;

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const getStønadskontoNavnFromKonto = (konto: KontoTypeUttak) => {
        return getStønadskontoNavn(intl, konto, navnPåForeldre, søkerErFarEllerMedmor, erAleneOmOmsorg);
    };

    const getUttaksperiodeNavn = (periode: Uttaksperiode) => {
        const tittel = getStønadskontoNavnFromKonto(periode.konto);
        const termindato = getTermindato(barn) ? dayjs(getTermindato(barn)).toDate() : undefined;
        return søkersituasjon.situasjon === 'fødsel' &&
            isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
            ? tittel + intl.formatMessage({ id: 'rundtFødsel' })
            : tittel;
    };

    const formatTidsperiode = (tidsperiode: TidsperiodeDate): string => {
        const formatertTidsperiode = intl.formatMessage(
            { id: 'tidsintervall' },
            {
                fom: capitalizeFirstLetter(formatDateMedUkedagShortMonth(tidsperiode.fom)),
                tom: formatDateMedUkedagShortMonth(tidsperiode.tom),
            },
        );
        if (uttaksperiodeKanJusteresVedFødsel(ønskerJustertUttakVedFødsel, getTermindato(barn), tidsperiode.fom)) {
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
                    {uttaksplan.map((periode) => {
                        const periodeErNyEllerEndret = sak ? erPeriodeIOpprinneligPlan(sak, periode) === false : true;

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
                                            getTermindato(barn) ? dayjs(getTermindato(barn)).toDate() : undefined,
                                            søkersituasjon.situasjon,
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
