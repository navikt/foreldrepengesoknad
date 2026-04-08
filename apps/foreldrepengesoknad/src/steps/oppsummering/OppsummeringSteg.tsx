import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { SøknadRoutes } from 'appData/routes';
import { useFpNavigator } from 'appData/useFpNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage, useIntl } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { getFamiliehendelsedato } from 'utils/barnUtils';
import { getErSøkerFarEllerMedmor, getKjønnFromFnrString, getNavnPåForeldre } from 'utils/personUtils';

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
import { FpPersonopplysningerDto_fpoversikt, FpSak_fpoversikt, Søkerrolle } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { AndreInntektskilderOppsummering } from './andre-inntekter-oppsummering/AndreInntektskilderOppsummering';
import { AnnenForelderOppsummering } from './annen-forelder-oppsummering/AnnenForelderOppsummering';
import { BarnOppsummering } from './barn-oppsummering/BarnOppsummering';
import { DokumentasjonOppsummering } from './dokumentasjon-oppsummering/DokumentasjonOppsummering';
import { PeriodeMedForeldrepengerOppsummering } from './periode-med-foreldrepenger/PeriodeMedForeldrepengerOppsummering';
import { UttaksplanOppsummering } from './uttaksplan-oppsummering/UttaksplanOppsummering';

interface Props {
    søkerInfo: FpPersonopplysningerDto_fpoversikt;
    erEndringssøknad: boolean;
    sendSøknad: () => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    foreldrepengerSaker?: FpSak_fpoversikt[];
}

export const OppsummeringSteg = (props: Props) => {
    const { søkerInfo, erEndringssøknad, sendSøknad, avbrytSøknad, mellomlagreSøknadOgNaviger, foreldrepengerSaker } =
        props;
    const intl = useIntl();

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const eksisterendeSaksnummer = useContextGetData(ContextDataType.VALGT_EKSISTERENDE_SAKSNR);
    const arbeidsforholdOgInntekt = useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT);
    const frilans = useContextGetData(ContextDataType.FRILANS);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const andreInntektskilder = useContextGetData(ContextDataType.ANDRE_INNTEKTSKILDER);
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const eksisterendeSak = foreldrepengerSaker?.find((sak) => sak.saksnummer === eksisterendeSaksnummer);

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad, eksisterendeSak);
    const navigator = useFpNavigator(
        søkerInfo.arbeidsforhold,
        mellomlagreSøknadOgNaviger,
        erEndringssøknad,
        eksisterendeSak,
    );

    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo, annenForelder, søkerErFarEllerMedmor, intl);
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

    const visInfoboksOmFarskapsportal = skalViseInfoOmFarskapsportal(
        søkerInfo,
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
                    // For FP ber vi alltid om IM hvis arbeidsforhold.
                    // Men for SVP ber vi kun dersom det er tilrettelegging for et arbeidsforhold.
                    // Derfor trengs denne prop'en selvom det kan se ut som den kan utledes i komponenten fra aktiveArbeidsforhold
                    skalViseAlertOmIM={aktiveArbeidsforhold.length > 0}
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
                    navnPåForeldre={navnPåForeldre}
                    registrerteArbeidsforhold={aktiveArbeidsforhold}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.UTTAKSPLAN)}
                />
                <DokumentasjonOppsummering
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.DOKUMENTASJON)}
                    navnPåForeldre={navnPåForeldre}
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

const skalViseInfoOmFarskapsportal = (
    person: FpPersonopplysningerDto_fpoversikt,
    rolle: Søkerrolle,
    annenForelder: AnnenForelder,
    barnetErIkkeFødt?: boolean,
): boolean => {
    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const harAnnenForelderRett = !!erAnnenForelderOppgitt?.harRettPåForeldrepengerINorge;
    const erAnnenForelderFar =
        !!erAnnenForelderOppgitt?.fnr && getKjønnFromFnrString(erAnnenForelderOppgitt.fnr) === 'M';
    const harAnnenForelderUtenlandskFnr = !!erAnnenForelderOppgitt?.utenlandskFnr;
    const erSøkerIkkeGift = !person.erGift;

    return (
        (rolle === 'far' ||
            (rolle === 'mor' && erAnnenForelderFar && harAnnenForelderRett && !harAnnenForelderUtenlandskFnr)) &&
        !!barnetErIkkeFødt &&
        erSøkerIkkeGift
    );
};
