import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTermindato } from 'utils/barnUtils';
import { erPeriodeIOpprinneligPlan } from 'utils/eksisterendeSakUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';

import { FormSummary } from '@navikt/ds-react';

import { isAnnenForelderOppgitt } from '@navikt/fp-common';
import {
    EksternArbeidsforholdDto_fpoversikt,
    KontoTypeUttak,
    NavnPåForeldre,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import { capitalizeFirstLetter, formatDateMedUkedagShortMonth, getFamiliehendelsedato } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import {
    erUttaksperiode,
    getPeriodeTittel,
    isUttaksperiodeFarMedmorPgaFødsel,
    uttaksperiodeKanJusteresVedFødsel,
} from './OppsummeringUtils';
import { OverføringsperiodedetaljerNy } from './detaljer/OverføringsperiodedetaljerNy';
import { UttaksperiodedetaljerNy } from './detaljer/UttaksperiodedetaljerNy';
import { UtsettelsesperiodedetaljerNy } from './detaljer/UttsettelsesperiodedetaljerNy';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}

export const UttaksplanOppsummeringslisteNy = ({ navnPåForeldre, registrerteArbeidsforhold }: Props) => {
    const intl = useIntl();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_NY));
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const { ønskerJustertUttakVedFødsel } = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA_NY));

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const sak = sakerQuery.data?.foreldrepenger.find((s) => s.saksnummer === valgtEksisterendeSaksnr);

    const familiehendelsesdato = notEmpty(getFamiliehendelsedato(barn));

    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder);

    const erAleneOmOmsorg = erAnnenForelderOppgitt ? annenForelder?.erAleneOmOmsorg : false;

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const getStønadskontoNavnFromKonto = (konto: KontoTypeUttak | undefined) => {
        return konto === undefined
            ? ''
            : getStønadskontoNavn(intl, konto, navnPåForeldre, søkerErFarEllerMedmor, erAleneOmOmsorg);
    };

    const getUttaksperiodeNavn = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) => {
        const tittel = getStønadskontoNavnFromKonto(periode.kontoType);
        const termindato = getTermindato(barn) ? getTermindato(barn) : undefined;
        return søkersituasjon.situasjon === 'fødsel' &&
            isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato)
            ? tittel + intl.formatMessage({ id: 'rundtFødsel' })
            : tittel;
    };

    const formatTidsperiode = (fom: string, tom: string): string => {
        const formatertTidsperiode = intl.formatMessage(
            { id: 'tidsintervall' },
            {
                fom: capitalizeFirstLetter(formatDateMedUkedagShortMonth(fom)),
                tom: formatDateMedUkedagShortMonth(tom),
            },
        );
        if (uttaksperiodeKanJusteresVedFødsel(ønskerJustertUttakVedFødsel, getTermindato(barn), fom)) {
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

                        if (erUttaksperiode(periode)) {
                            const tidsperiode = formatTidsperiode(periode.fom, periode.tom);
                            return (
                                <FormSummary.Answer key={periode.kontoType + tidsperiode}>
                                    <FormSummary.Label>{tidsperiode}</FormSummary.Label>
                                    <FormSummary.Value>
                                        {getUttaksperiodeNavn(periode)}
                                        <UttaksperiodedetaljerNy
                                            periode={periode}
                                            registrerteArbeidsforhold={registrerteArbeidsforhold}
                                            periodeErNyEllerEndret={periodeErNyEllerEndret}
                                            søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                                            annenForelder={annenForelder}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            );
                        }
                        if (!('trekkdager' in periode) && periode.utsettelseÅrsak !== undefined) {
                            return (
                                <FormSummary.Answer key={lagKeyFraPeriode(periode)}>
                                    <FormSummary.Label>{formatTidsperiode(periode.fom, periode.tom)}</FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage id="oppsummering.utsettelse.pga" />
                                        <UtsettelsesperiodedetaljerNy
                                            periode={periode}
                                            registrerteArbeidsforhold={registrerteArbeidsforhold}
                                            søkerErFarEllerMedmor={søkerErFarEllerMedmor}
                                            annenForelder={annenForelder}
                                            periodeErNyEllerEndret={periodeErNyEllerEndret}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            );
                        }
                        if (!('trekkdager' in periode) && periode.overføringÅrsak !== undefined) {
                            return (
                                <FormSummary.Answer key={lagKeyFraPeriode(periode)}>
                                    <FormSummary.Label>{formatTidsperiode(periode.fom, periode.tom)}</FormSummary.Label>
                                    <FormSummary.Value>
                                        <FormattedMessage
                                            id="oppsummering.overtakelse.pga"
                                            values={{ konto: getStønadskontoNavnFromKonto(periode.kontoType) }}
                                        />
                                        <OverføringsperiodedetaljerNy
                                            periode={periode}
                                            navnPåForeldre={navnPåForeldre}
                                        />
                                    </FormSummary.Value>
                                </FormSummary.Answer>
                            );
                        }
                        if (!('trekkdager' in periode) && periode.oppholdÅrsak !== undefined) {
                            return (
                                <FormSummary.Answer key={lagKeyFraPeriode(periode)}>
                                    <FormSummary.Label>{formatTidsperiode(periode.fom, periode.tom)}</FormSummary.Label>
                                    <FormSummary.Value>
                                        {getPeriodeTittel(
                                            intl,
                                            periode,
                                            navnPåForeldre,
                                            familiehendelsesdato,
                                            getTermindato(barn) ? getTermindato(barn) : undefined,
                                            søkersituasjon.situasjon,
                                            søkerErFarEllerMedmor,
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

const lagKeyFraPeriode = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) =>
    periode.kontoType + periode.fom + periode.tom;
