import { useQuery } from '@tanstack/react-query';
import { useUttaksplanOptions } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
import { finnAnnenPartsPlan } from 'utils/annenForelderUtils';
import { getTermindato } from 'utils/barnUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';
import { getStønadskvoteNavn } from 'utils/stønadskvoterUtils';
import { isUttaksperiodeFarMedmorPgaFødsel } from 'utils/uttaksplanInfoUtils';

import { Alert, BodyLong, FormSummary, VStack } from '@navikt/ds-react';

import {
    EksternArbeidsforholdDto_fpoversikt,
    KontoType,
    MorsAktivitet,
    NavnPåForeldre,
    UttakDto,
    UttakPeriodeDto,
} from '@navikt/fp-types';
import {
    Uttaksperioden,
    capitalizeFirstLetter,
    formatDateMedUkedagShortMonth,
    getFamiliehendelsedato,
} from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { uttaksperiodeKanJusteresVedFødsel } from './OppsummeringUtils';
import { Overføringsperiodedetaljer } from './detaljer/Overføringsperiodedetaljer';
import { Uttaksperiodedetaljer } from './detaljer/Uttaksperiodedetaljer';
import { Utsettelsesperiodedetaljer } from './detaljer/Uttsettelsesperiodedetaljer';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}

export const UttaksplanOppsummeringsliste = ({ navnPåForeldre, registrerteArbeidsforhold }: Props) => {
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));

    const søkersPerioder = uttaksplan.filter((periode) => periode.søker !== undefined);
    const annenPartsPerioder = uttaksplan.filter((periode) => periode.annenPart !== undefined);

    const annenPartsPlanQuery = useQuery({
        ...useUttaksplanOptions(),
        select: (plan) => finnAnnenPartsPlan(plan) !== undefined,
    });
    const søkerHarLagtTilPerioderForAnnenPart =
        annenPartsPlanQuery.isSuccess && !annenPartsPlanQuery.data && annenPartsPerioder.length > 0;

    return (
        <>
            {søkersPerioder.length > 0 && (
                <UttaksplanListe
                    erSøker
                    uttaksplan={søkersPerioder}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    navnPåForeldre={navnPåForeldre}
                />
            )}
            {annenPartsPerioder.length > 0 && (
                <UttaksplanListe
                    erSøker={false}
                    uttaksplan={annenPartsPerioder}
                    registrerteArbeidsforhold={registrerteArbeidsforhold}
                    navnPåForeldre={navnPåForeldre}
                    visAdvarselOmEgendefinertePerioder={søkerHarLagtTilPerioderForAnnenPart}
                />
            )}
        </>
    );
};

const UttaksplanListe = ({
    erSøker,
    uttaksplan,
    registrerteArbeidsforhold,
    navnPåForeldre,
    visAdvarselOmEgendefinertePerioder,
}: {
    erSøker: boolean;
    uttaksplan: UttakPeriodeDto[];
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
    navnPåForeldre: NavnPåForeldre;
    visAdvarselOmEgendefinertePerioder?: boolean;
}) => {
    const intl = useIntl();

    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const ønskerJustertUttakVedFødsel = useContextGetData(ContextDataType.HAR_JUSTERT_UTTAK_VED_FØDSEL);

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);

    const familiehendelsesdato = notEmpty(getFamiliehendelsedato(barn));

    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder);

    const erAleneOmOmsorg = erAnnenForelderOppgitt ? annenForelder?.erAleneOmOmsorg : false;
    const termindato = getTermindato(barn);

    // Uttaket denne listen viser: søkerens eget (.søker) eller annen parts (.annenPart).
    const finnUttak = (periode: UttakPeriodeDto) => (erSøker ? periode.søker : periode.annenPart);

    const getStønadskvoteNavnFraKvote = (konto: KontoType | undefined, morsAktivitet?: MorsAktivitet) => {
        return (
            (konto !== undefined &&
                getStønadskvoteNavn(
                    intl,
                    konto,
                    navnPåForeldre,
                    søkerErFarEllerMedmor,
                    erAleneOmOmsorg,
                    morsAktivitet,
                )) ||
            ''
        );
    };

    const getUttaksperiodeNavn = (periode: UttakPeriodeDto, uttak: UttakDto | undefined) => {
        const tittel = getStønadskvoteNavnFraKvote(uttak?.kontoType, uttak?.morsAktivitet);
        const periodeForFødselssjekk = { ...periode, søker: uttak };
        return søkersituasjon.situasjon === 'fødsel' &&
            isUttaksperiodeFarMedmorPgaFødsel(periodeForFødselssjekk, familiehendelsesdato, termindato)
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
        // Må vere ein FormSummary.Answer (ikkje ein vanleg div): denne blir rendra rett inni
        // <dl>-en til FormSummary.Answers, og der er berre dt/dd-grupper gyldige.
        <FormSummary.Answer>
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
                <VStack gap="space-16">
                    {visAdvarselOmEgendefinertePerioder && (
                        <Alert variant="warning">
                            <BodyLong>
                                <FormattedMessage id="oppsummering.AnnenPartPerioderInfomelding" />
                            </BodyLong>
                        </Alert>
                    )}
                    <FormSummary.Answers>
                        {uttaksplan.map((periode) => {
                            const uttak = finnUttak(periode);

                            // Ein avslått periode som framleis trekkjer dagar er ikkje eit uttak, men
                            // dagar brukaren mister. Han skal difor merkast «Trekte dager», slik han
                            // òg blir i listevisninga og kalenderen, ikkje med namnet på stønadskontoen.
                            if (erAvslåttPeriodeSomTrekkerDager(uttak)) {
                                return (
                                    <FormSummary.Answer key={lagKeyFraPeriode(periode, uttak)}>
                                        <FormSummary.Label>
                                            {formatTidsperiode(periode.fom, periode.tom)}
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormattedMessage id="oppsummering.uttak.trekteDager" />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            if (uttak && Uttaksperioden.erUttaksperiode(uttak)) {
                                const tidsperiode = formatTidsperiode(periode.fom, periode.tom);
                                return (
                                    <FormSummary.Answer key={uttak.kontoType + tidsperiode}>
                                        <FormSummary.Label>{tidsperiode}</FormSummary.Label>
                                        <FormSummary.Value>
                                            {getUttaksperiodeNavn(periode, uttak)}
                                            <Uttaksperiodedetaljer
                                                uttak={uttak}
                                                registrerteArbeidsforhold={registrerteArbeidsforhold}
                                                annenForelder={annenForelder}
                                                barn={barn}
                                                erSøker={erSøker}
                                            />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            if (uttak?.utsettelseÅrsak !== undefined) {
                                return (
                                    <FormSummary.Answer key={lagKeyFraPeriode(periode, uttak)}>
                                        <FormSummary.Label>
                                            {formatTidsperiode(periode.fom, periode.tom)}
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormattedMessage id="oppsummering.utsettelse.pga" />
                                            <Utsettelsesperiodedetaljer uttak={uttak} />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            if (uttak?.overføringÅrsak !== undefined) {
                                return (
                                    <FormSummary.Answer key={lagKeyFraPeriode(periode, uttak)}>
                                        <FormSummary.Label>
                                            {formatTidsperiode(periode.fom, periode.tom)}
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormattedMessage
                                                id="oppsummering.overtakelse.pga"
                                                values={{ kvote: getStønadskvoteNavnFraKvote(uttak.kontoType) }}
                                            />
                                            <Overføringsperiodedetaljer uttak={uttak} navnPåForeldre={navnPåForeldre} />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            return null;
                        })}
                    </FormSummary.Answers>
                </VStack>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

const lagKeyFraPeriode = (periode: UttakPeriodeDto, uttak: UttakDto | undefined) =>
    (uttak?.kontoType ?? 'opphold') + periode.fom + periode.tom;

// Speglar erAlleUttaksplanperioderAvslått i listevisninga: pleiepenger-fratrekk er ikkje trekte
// dagar, men prematurveker, og har si eiga handsaming.
const erAvslåttPeriodeSomTrekkerDager = (uttak: UttakDto | undefined): boolean =>
    !!(
        uttak?.resultat?.innvilget === false &&
        uttak.resultat.trekkerDager &&
        uttak.resultat.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
    );
