import { useQuery } from '@tanstack/react-query';
import { sakerOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTermindato } from 'utils/barnUtils';
import { erPeriodeIOpprinneligSak } from 'utils/eksisterendeSakUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';
import { getStønadskontoNavn } from 'utils/stønadskontoerUtils';
import { isUttaksperiodeFarMedmorPgaFødsel } from 'utils/uttaksplanInfoUtils';

import { Alert, BodyLong, FormSummary, VStack } from '@navikt/ds-react';

import { isAnnenForelderOppgitt } from '@navikt/fp-common';
import {
    EksternArbeidsforholdDto_fpoversikt,
    FpSak_fpoversikt,
    KontoTypeUttak,
    NavnPåForeldre,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';
import {
    Uttaksperioden,
    capitalizeFirstLetter,
    formatDateMedUkedagShortMonth,
    getFamiliehendelsedato,
} from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { getPeriodeTittel, uttaksperiodeKanJusteresVedFødsel } from './OppsummeringUtils';
import { OverføringsperiodedetaljerNy } from './detaljer/OverføringsperiodedetaljerNy';
import { UttaksperiodedetaljerNy } from './detaljer/UttaksperiodedetaljerNy';
import { UtsettelsesperiodedetaljerNy } from './detaljer/UttsettelsesperiodedetaljerNy';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}

export const UttaksplanOppsummeringslisteNy = ({ navnPåForeldre, registrerteArbeidsforhold }: Props) => {
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_NY));
    const valgtEksisterendeSaksnr = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const sakerQuery = useQuery({ ...sakerOptions(), enabled: !!valgtEksisterendeSaksnr });

    const sak = sakerQuery.data?.foreldrepenger.find((s) => s.saksnummer === valgtEksisterendeSaksnr);

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const søkersPerioder = uttaksplan.filter((periode) => {
        return (
            Uttaksperioden.erIkkeEøsPeriode(periode) &&
            periode.forelder === (søkerErFarEllerMedmor ? 'FAR_MEDMOR' : 'MOR')
        );
    });

    const annenPartsPerioder = filtrerBortPerioderUtenTrekkdager(
        uttaksplan.filter((periode) => {
            return (
                Uttaksperioden.erIkkeEøsPeriode(periode) &&
                periode.forelder === (søkerErFarEllerMedmor ? 'MOR' : 'FAR_MEDMOR')
            );
        }),
    );

    return (
        <VStack gap="space-16">
            {annenPartsPerioder.length > 0 && (
                <Alert variant="warning">
                    <BodyLong>
                        <FormattedMessage id="oppsummering.AnnenPartPerioderInfomelding" />
                    </BodyLong>
                </Alert>
            )}
            {søkersPerioder.length > 0 && (
                <UttaksplanListe
                    erSøker
                    uttaksplan={søkersPerioder}
                    sak={sak}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    navnPåForeldre={navnPåForeldre}
                />
            )}
            {annenPartsPerioder.length > 0 && (
                <UttaksplanListe
                    erSøker={false}
                    uttaksplan={annenPartsPerioder}
                    sak={sak}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    navnPåForeldre={navnPåForeldre}
                />
            )}
        </VStack>
    );
};

const UttaksplanListe = ({
    erSøker,
    uttaksplan,
    sak,
    registrerteArbeidsforhold,
    navnPåForeldre,
}: {
    erSøker: boolean;
    uttaksplan: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    sak: FpSak_fpoversikt | undefined;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    navnPåForeldre: NavnPåForeldre;
}) => {
    const intl = useIntl();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const { ønskerJustertUttakVedFødsel } = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA_NY));

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const familiehendelsesdato = notEmpty(getFamiliehendelsedato(barn));

    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder);

    const erAleneOmOmsorg = erAnnenForelderOppgitt ? annenForelder?.erAleneOmOmsorg : false;

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
        <div>
            {erSøker && (
                <FormSummary.Label>
                    <FormattedMessage id="oppsummering.uttak.dine.perioder" />
                </FormSummary.Label>
            )}
            {!erSøker && (
                <FormSummary.Label>
                    <FormattedMessage id="oppsummering.uttak.dine.perioder.annenpart" />
                </FormSummary.Label>
            )}
            <FormSummary.Value>
                <FormSummary.Answers>
                    {uttaksplan.map((periode) => {
                        const periodeErNyEllerEndret = sak ? erPeriodeIOpprinneligSak(sak, periode) === false : true;

                        if (Uttaksperioden.erIkkeEøsPeriode(periode) && Uttaksperioden.erUttaksperiode(periode)) {
                            const tidsperiode = formatTidsperiode(periode.fom, periode.tom);
                            return (
                                <FormSummary.Answer key={periode.kontoType + tidsperiode}>
                                    <FormSummary.Label>{tidsperiode}</FormSummary.Label>
                                    <FormSummary.Value>
                                        {getUttaksperiodeNavn(periode)}
                                        <UttaksperiodedetaljerNy
                                            periode={periode}
                                            registrerteArbeidsforhold={registrerteArbeidsforhold}
                                            annenForelder={annenForelder}
                                            barn={barn}
                                            erSøker={erSøker}
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
        </div>
    );
};

const lagKeyFraPeriode = (periode: UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt) =>
    periode.kontoType + periode.fom + periode.tom;

//TODO (TOR) Denne fjerninga av avslåtte periodar uten trekkdagar bør ligga i backend
const filtrerBortPerioderUtenTrekkdager = (
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>,
) =>
    perioder.filter(
        (periode) =>
            Uttaksperioden.erEøsPeriode(periode) ||
            !(periode.resultat?.innvilget === false && periode.resultat.trekkerDager === false),
    );
