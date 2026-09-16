import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage, useIntl } from 'react-intl';
import { isAnnenForelderOppgitt } from 'types/AnnenForelder';
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
    PeriodeDto_fpoversikt,
    UttakDto_fpoversikt,
} from '@navikt/fp-types';
import {
    Uttaksperioden,
    capitalizeFirstLetter,
    formatDateMedUkedagShortMonth,
    getFamiliehendelsedato,
} from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { getPeriodeTittel, uttaksperiodeKanJusteresVedFødsel } from './OppsummeringUtils';
import { Overføringsperiodedetaljer } from './detaljer/Overføringsperiodedetaljer';
import { Uttaksperiodedetaljer } from './detaljer/Uttaksperiodedetaljer';
import { Utsettelsesperiodedetaljer } from './detaljer/Uttsettelsesperiodedetaljer';

interface Props {
    navnPåForeldre: NavnPåForeldre;
    registrerteArbeidsforhold: EksternArbeidsforholdDto_fpoversikt[];
}

export const UttaksplanOppsummeringsliste = ({ navnPåForeldre, registrerteArbeidsforhold }: Props) => {
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));

    // Ei oppholdsperiode (periode.søker er udefinert, periode.annenPart er sett) er strukturelt eit
    // hol i søkjaren sin eigen tidslinje der annan part tek ut, og høyrer difor heime i søkjaren si
    // liste, akkurat som før då dette var ein eigen rad-type i søkjaren sin flate periodeliste.
    const søkersPerioder = filtrerBortPerioderUtenTrekkdager(
        uttaksplan.filter((periode) => periode.søker !== undefined || Uttaksperioden.erOppholdsperiode(periode)),
        true,
    );

    const annenPartsPerioder = filtrerBortPerioderUtenTrekkdager(
        uttaksplan.filter((periode) => periode.annenPart !== undefined),
        false,
    );

    const søkerHarLagtTilPerioderForAnnenPart = annenPartsPerioder.some(
        (periode) => periode.annenPart?.resultat === undefined,
    );

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
    uttaksplan: PeriodeDto_fpoversikt[];
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

    // Sida denne lista viser periodane til: søkjaren sin eigen (.søker) eller annan part sin (.annenPart).
    const finnSide = (periode: PeriodeDto_fpoversikt): UttakDto_fpoversikt | undefined =>
        erSøker ? periode.søker : periode.annenPart;

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

    const getUttaksperiodeNavn = (periode: PeriodeDto_fpoversikt, side: UttakDto_fpoversikt | undefined) => {
        const tittel = getStønadskvoteNavnFraKvote(side?.kontoType, side?.morsAktivitet);
        const periodeForFødselssjekk: PeriodeDto_fpoversikt = { ...periode, søker: side };
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
                            const side = finnSide(periode);

                            // Ein avslått periode som framleis trekkjer dagar er ikkje eit uttak, men
                            // dagar brukaren mister. Han skal difor merkast «Trekte dager», slik han
                            // òg blir i listevisninga og kalenderen, ikkje med namnet på stønadskontoen.
                            if (erAvslåttPeriodeSomTrekkerDager(side)) {
                                return (
                                    <FormSummary.Answer key={lagKeyFraPeriode(periode, side)}>
                                        <FormSummary.Label>
                                            {formatTidsperiode(periode.fom, periode.tom)}
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormattedMessage id="oppsummering.uttak.trekteDager" />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            if (side && Uttaksperioden.erUttaksperiode(side)) {
                                const tidsperiode = formatTidsperiode(periode.fom, periode.tom);
                                return (
                                    <FormSummary.Answer key={side.kontoType + tidsperiode}>
                                        <FormSummary.Label>{tidsperiode}</FormSummary.Label>
                                        <FormSummary.Value>
                                            {getUttaksperiodeNavn(periode, side)}
                                            <Uttaksperiodedetaljer
                                                periode={side}
                                                registrerteArbeidsforhold={registrerteArbeidsforhold}
                                                annenForelder={annenForelder}
                                                barn={barn}
                                                erSøker={erSøker}
                                            />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            if (side?.utsettelseÅrsak !== undefined) {
                                return (
                                    <FormSummary.Answer key={lagKeyFraPeriode(periode, side)}>
                                        <FormSummary.Label>
                                            {formatTidsperiode(periode.fom, periode.tom)}
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormattedMessage id="oppsummering.utsettelse.pga" />
                                            <Utsettelsesperiodedetaljer periode={side} />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            if (side?.overføringÅrsak !== undefined) {
                                return (
                                    <FormSummary.Answer key={lagKeyFraPeriode(periode, side)}>
                                        <FormSummary.Label>
                                            {formatTidsperiode(periode.fom, periode.tom)}
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            <FormattedMessage
                                                id="oppsummering.overtakelse.pga"
                                                values={{ kvote: getStønadskvoteNavnFraKvote(side.kontoType) }}
                                            />
                                            <Overføringsperiodedetaljer
                                                periode={side}
                                                navnPåForeldre={navnPåForeldre}
                                            />
                                        </FormSummary.Value>
                                    </FormSummary.Answer>
                                );
                            }
                            if (erSøker && Uttaksperioden.erOppholdsperiode(periode)) {
                                return (
                                    <FormSummary.Answer key={lagKeyFraPeriode(periode, side)}>
                                        <FormSummary.Label>
                                            {formatTidsperiode(periode.fom, periode.tom)}
                                        </FormSummary.Label>
                                        <FormSummary.Value>
                                            {getPeriodeTittel(
                                                intl,
                                                periode,
                                                side,
                                                navnPåForeldre,
                                                familiehendelsesdato,
                                                termindato,
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
                </VStack>
            </FormSummary.Value>
        </FormSummary.Answer>
    );
};

const lagKeyFraPeriode = (periode: PeriodeDto_fpoversikt, side: UttakDto_fpoversikt | undefined) =>
    (side?.kontoType ?? 'opphold') + periode.fom + periode.tom;

// Speglar erAlleUttaksplanperioderAvslått i listevisninga: pleiepenger-fratrekk er ikkje trekte
// dagar, men prematurveker, og har si eiga handsaming.
const erAvslåttPeriodeSomTrekkerDager = (side: UttakDto_fpoversikt | undefined): boolean =>
    !!(
        side?.resultat?.innvilget === false &&
        side.resultat.trekkerDager &&
        side.resultat.årsak !== 'AVSLAG_FRATREKK_PLEIEPENGER'
    );

// TODO (TOR) Denne fjerninga av avslåtte periodar uten trekkdagar bør ligga i backend
const filtrerBortPerioderUtenTrekkdager = (perioder: PeriodeDto_fpoversikt[], erSøkerListe: boolean) =>
    perioder.filter((periode) => {
        const side = erSøkerListe ? periode.søker : periode.annenPart;
        return side === undefined || side.resultat?.innvilget !== false || side.resultat.trekkerDager;
    });
