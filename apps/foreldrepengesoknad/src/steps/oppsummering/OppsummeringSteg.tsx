import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage, useIntl } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { getFamiliehendelsedato, getTermindato } from 'utils/barnUtils';
import { ISOStringToDate } from 'utils/dateUtils';
import { getErSøkerFarEllerMedmor, getKjønnFromFnrString, getNavnPåForeldre } from 'utils/personUtils';
import { getRelevantePerioder } from 'utils/uttaksplanInfoUtils';

import { Alert, Heading, Link } from '@navikt/ds-react';

import { AnnenForelder, isAnnenForelderOppgitt, isUfødtBarn } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import {
    ArbeidsforholdOppsummering,
    BoIUtlandetOppsummering,
    FrilansOppsummering,
    OppsummeringPanel,
    SelvstendigNæringsdrivendeOppsummering,
} from '@navikt/fp-steg-oppsummering';
import { PersonDto_fpoversikt, PersonMedArbeidsforholdDto_fpoversikt, Søkerrolle } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { perioderSomKreverVedlegg } from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { AndreInntektskilderOppsummering } from './andre-inntekter-oppsummering/AndreInntektskilderOppsummering';
import { AnnenForelderOppsummering } from './annen-forelder-oppsummering/AnnenForelderOppsummering';
import { BarnOppsummering } from './barn-oppsummering/BarnOppsummering';
import { DokumentasjonOppsummering } from './dokumentasjon-oppsummering/DokumentasjonOppsummering';
import { PeriodeMedForeldrepengerOppsummering } from './periode-med-foreldrepenger/PeriodeMedForeldrepengerOppsummering';
import { UttaksplanOppsummering } from './uttaksplan-oppsummering/UttaksplanOppsummering';

const skalViseInfoOmFarskapsportal = (
    person: PersonDto_fpoversikt,
    rolle: Søkerrolle,
    annenForelder: AnnenForelder,
    barnetErIkkeFødt?: boolean,
): boolean => {
    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const harAnnenForelderRett = !!erAnnenForelderOppgitt?.harRettPåForeldrepengerINorge;
    const erAnnenForelderFar =
        !!erAnnenForelderOppgitt?.fnr && getKjønnFromFnrString(erAnnenForelderOppgitt.fnr) === 'M';
    const harAnnenForelderUtenlandskFnr = !!erAnnenForelderOppgitt?.utenlandskFnr;
    const erSøkerIkkeGift = person.sivilstand?.type !== 'GIFT';

    return (
        (rolle === 'far' ||
            (rolle === 'mor' && erAnnenForelderFar && harAnnenForelderRett && !harAnnenForelderUtenlandskFnr)) &&
        !!barnetErIkkeFødt &&
        erSøkerIkkeGift
    );
};

interface Props {
    søkerInfo: PersonMedArbeidsforholdDto_fpoversikt;
    erEndringssøknad: boolean;
    sendSøknad: () => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
}

export const OppsummeringSteg = (props: Props) => {
    const { søkerInfo, erEndringssøknad, sendSøknad, avbrytSøknad, mellomlagreSøknadOgNaviger } = props;
    const intl = useIntl();

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad);
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const arbeidsforholdOgInntekt = useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = useContextGetData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const dekningsgrad = notEmpty(useContextGetData(ContextDataType.PERIODE_MED_FORELDREPENGER));
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA));
    const eksisterendeSak = useContextGetData(ContextDataType.EKSISTERENDE_SAK);
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG);

    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder);
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo.person, annenForelder, søkerErFarEllerMedmor, intl);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const termindato = getTermindato(barn);
    const erEndringssøknadOgAnnenForelderHarRett =
        erEndringssøknad && isAnnenForelderOppgitt(annenForelder) && annenForelder.harRettPåForeldrepengerINorge;
    const ekstraSamtykketekst = erEndringssøknadOgAnnenForelderHarRett
        ? intl.formatMessage(
              { id: 'oppsummering.harGodkjentOppsummering.endringssøknadMedAnnenForelder' },
              {
                  navnAnnenForelder: annenForelder.fornavn,
              },
          )
        : '';

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const relevantePerioder = getRelevantePerioder(
        uttaksplan,
        uttaksplanMetadata?.perioderSomSkalSendesInn,
        erEndringssøknad,
    );
    const uttaksperioderSomManglerVedlegg = perioderSomKreverVedlegg(
        relevantePerioder,
        erSøkerFarEllerMedmor,
        annenForelder,
    );

    const visInfoboksOmFarskapsportal = skalViseInfoOmFarskapsportal(
        søkerInfo.person,
        søkersituasjon.rolle,
        annenForelder,
        isUfødtBarn(barn),
    );

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(
        søkerInfo.arbeidsforhold,
        søkersituasjon.situasjon === 'adopsjon',
        søkerErFarEllerMedmor,
        getFamiliehendelsedato(barn),
    );

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <OppsummeringPanel
                appName="Foreldrepenger"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                onAvsluttOgSlett={avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                ekstraSamtykketekst={ekstraSamtykketekst}
            >
                {!erEndringssøknad && (
                    <>
                        <BarnOppsummering
                            barn={barn}
                            onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.OM_BARNET)}
                        />
                        <AnnenForelderOppsummering
                            annenForelder={annenForelder}
                            søkerrolle={søkersituasjon.rolle}
                            onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.ANNEN_FORELDER)}
                        />
                        <BoIUtlandetOppsummering
                            onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.UTENLANDSOPPHOLD)}
                            tidligereUtenlandsopphold={tidligereUtenlandsopphold ?? []}
                            senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                        />
                    </>
                )}
                <ArbeidsforholdOppsummering
                    arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                    arbeidsforhold={aktiveArbeidsforhold}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.ARBEID_OG_INNTEKT)}
                />
                <FrilansOppsummering
                    frilans={frilans}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.FRILANS)}
                />
                <SelvstendigNæringsdrivendeOppsummering
                    egenNæring={egenNæring}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.EGEN_NÆRING)}
                />
                <AndreInntektskilderOppsummering
                    andreInntektskilder={andreInntektskilder}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.ANDRE_INNTEKTER)}
                />
                {!erEndringssøknad && (
                    <PeriodeMedForeldrepengerOppsummering
                        onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.PERIODE_MED_FORELDREPENGER)}
                    />
                )}

                <UttaksplanOppsummering
                    perioder={uttaksplan}
                    navnPåForeldre={navnPåForeldre}
                    annenForelder={annenForelder}
                    erFarEllerMedmor={søkerErFarEllerMedmor}
                    registrerteArbeidsforhold={aktiveArbeidsforhold}
                    dekningsgrad={dekningsgrad}
                    antallUkerUttaksplan={notEmpty(uttaksplanMetadata.antallUkerIUttaksplan)}
                    eksisterendeUttaksplan={eksisterendeSak ? eksisterendeSak.uttaksplan : undefined}
                    familiehendelsesdato={notEmpty(familiehendelsesdato)}
                    termindato={termindato}
                    situasjon={søkersituasjon.situasjon}
                    erAleneOmOmsorg={erAnnenForelderOppgitt ? annenForelder?.erAleneOmOmsorg : false}
                    antallBarn={barn.antallBarn}
                    ønskerJustertUttakVedFødsel={uttaksplanMetadata.ønskerJustertUttakVedFødsel}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.UTTAKSPLAN)}
                />
                <DokumentasjonOppsummering
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.DOKUMENTASJON)}
                    alleVedlegg={vedlegg}
                    erSøkerFarEllerMedmor={erSøkerFarEllerMedmor}
                    navnPåForeldre={navnPåForeldre}
                    uttaksperioderSomManglerVedlegg={uttaksperioderSomManglerVedlegg}
                />
                <>
                    {visInfoboksOmFarskapsportal && (
                        <Alert variant="info">
                            <Heading size="small" level="3">
                                <FormattedMessage
                                    id="oppsummering.tekstOmFarskapsportal.overskrift"
                                    values={{ hvem: søkersituasjon.rolle }}
                                />
                            </Heading>

                            <FormattedMessage
                                id="oppsummering.tekstOmFarskapsportal.far"
                                values={{
                                    hvem: søkersituasjon.rolle,
                                    a: (msg) => (
                                        <Link href={links.farskapsportal} rel="noreferrer" target="_blank">
                                            {msg}
                                        </Link>
                                    ),
                                    antallBarn: barn.antallBarn,
                                }}
                            />
                        </Alert>
                    )}
                </>
            </OppsummeringPanel>
        </SkjemaRotLayout>
    );
};
