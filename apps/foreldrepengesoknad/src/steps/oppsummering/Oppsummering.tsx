import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import SøknadRoutes from 'appData/routes';
import useFpNavigator from 'appData/useFpNavigator';
import useStepConfig from 'appData/useStepConfig';
import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getFamiliehendelsedato, getTermindato } from 'utils/barnUtils';
import { ISOStringToDate } from 'utils/dateUtils';
import { getErSøkerFarEllerMedmor, getKjønnFromFnrString, getNavnPåForeldre } from 'utils/personUtils';

import { Accordion, Alert, BodyLong, Heading, VStack } from '@navikt/ds-react';

import { AnnenForelder, SivilstandType, isAnnenForelderOppgitt, isUfødtBarn } from '@navikt/fp-common';
import { links } from '@navikt/fp-constants';
import {
    ArbeidsforholdOppsummering,
    BoIUtlandetOppsummering,
    FrilansOppsummering,
    OppsummeringPanel,
    SelvstendigNæringsdrivendeOppsummering,
} from '@navikt/fp-steg-oppsummering';
import { Søker, Søkerinfo, Søkerrolle } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { søknadInneholderIngenVedlegg } from '../manglende-vedlegg/util';
import { AndreInntektskilderOppsummering } from './components/andre-inntekter-oppsummering/AndreInntektskilderOppsummering';
import AnnenForelderOppsummering from './components/annen-forelder-oppsummering/AnnenForelderOppsummering';
import BarnOppsummering from './components/barn-oppsummering/BarnOppsummering';
import { DokumentasjonOppsummering } from './components/dokumentasjon-oppsummering/DokumentasjonOppsummering';
import { PeriodeMedForeldrepengerOppsummering } from './components/periode-med-foreldrepenger/PeriodeMedForeldrepengerOppsummering';
import UttaksplanOppsummering from './components/uttaksplan-oppsummering/UttaksplanOppsummering';

const skalViseInfoOmFarskapsportal = (
    søker: Søker,
    rolle: Søkerrolle,
    annenForelder: AnnenForelder,
    barnetErIkkeFødt?: boolean,
): boolean => {
    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder) ? annenForelder : undefined;
    const harAnnenForelderRett = !!erAnnenForelderOppgitt?.harRettPåForeldrepengerINorge;
    const erAnnenForelderFar =
        !!erAnnenForelderOppgitt?.fnr && getKjønnFromFnrString(erAnnenForelderOppgitt.fnr) === 'M';
    const harAnnenForelderUtenlandskFnr = !!erAnnenForelderOppgitt?.utenlandskFnr;
    const erSøkerIkkeGift = søker.sivilstand?.type !== SivilstandType.GIFT;

    return (
        (rolle === 'far' ||
            (rolle === 'mor' && erAnnenForelderFar && harAnnenForelderRett && !harAnnenForelderUtenlandskFnr)) &&
        !!barnetErIkkeFødt &&
        erSøkerIkkeGift
    );
};

export interface Props {
    søkerInfo: Søkerinfo;
    erEndringssøknad: boolean;
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
}

const Oppsummering: FunctionComponent<Props> = (props) => {
    const { søkerInfo, erEndringssøknad, sendSøknad, avbrytSøknad, mellomlagreSøknadOgNaviger } = props;
    const intl = useIntl();

    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold, erEndringssøknad);
    const navigator = useFpNavigator(søkerInfo.arbeidsforhold, mellomlagreSøknadOgNaviger, erEndringssøknad);
    const [manglerDokumentasjon, setManglerDokumentasjon] = useState(false);

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
    const inneholderIkkeVedlegg = søknadInneholderIngenVedlegg(vedlegg);

    const erAnnenForelderOppgitt = isAnnenForelderOppgitt(annenForelder);
    const søkerErFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const navnPåForeldre = getNavnPåForeldre(søkerInfo.søker, annenForelder, søkerErFarEllerMedmor, intl);
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

    const søker = søkerInfo.søker;
    const rolle = søkersituasjon.rolle;

    const barnetErIkkeFødt = isUfødtBarn(barn);

    const visInfoboksOmFarskapsportal = skalViseInfoOmFarskapsportal(søker, rolle, annenForelder, barnetErIkkeFødt);

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <OppsummeringPanel
                appName="Foreldrepenger"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onContinueLater={navigator.fortsettSøknadSenere}
                ekstraSamtykketekst={ekstraSamtykketekst}
            >
                <BarnOppsummering
                    barn={barn}
                    familiehendelsesdato={familiehendelsesdato!}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.OM_BARNET)}
                />
                <AnnenForelderOppsummering
                    annenForelder={annenForelder}
                    søkerrolle={søkersituasjon.rolle}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.ANNEN_FORELDER)}
                />
                <>
                    {!erEndringssøknad && (
                        <BoIUtlandetOppsummering
                            onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.UTENLANDSOPPHOLD)}
                            tidligereUtenlandsopphold={tidligereUtenlandsopphold ?? []}
                            senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                        />
                    )}
                </>
                <ArbeidsforholdOppsummering
                    arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                    arbeidsforhold={søkerInfo.arbeidsforhold}
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
                <PeriodeMedForeldrepengerOppsummering
                    periodeMedForeldrepenger={{ dekningsgrad }}
                    annenForelder={annenForelder}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.PERIODE_MED_FORELDREPENGER)}
                />
                <Accordion indent={false}>
                    <OppsummeringPanel.Punkt tittel={intl.formatMessage({ id: 'oppsummering.uttak' })}>
                        <UttaksplanOppsummering
                            perioder={uttaksplan}
                            navnPåForeldre={navnPåForeldre}
                            annenForelder={annenForelder}
                            erFarEllerMedmor={søkerErFarEllerMedmor}
                            registrerteArbeidsforhold={søkerInfo.arbeidsforhold}
                            dekningsgrad={dekningsgrad}
                            antallUkerUttaksplan={uttaksplanMetadata.antallUkerIUttaksplan!}
                            eksisterendeUttaksplan={eksisterendeSak ? eksisterendeSak.uttaksplan : undefined}
                            familiehendelsesdato={familiehendelsesdato!}
                            termindato={termindato}
                            situasjon={søkersituasjon.situasjon}
                            erAleneOmOmsorg={erAnnenForelderOppgitt ? annenForelder?.erAleneOmOmsorg : false}
                            antallBarn={barn.antallBarn}
                            ønskerJustertUttakVedFødsel={uttaksplanMetadata.ønskerJustertUttakVedFødsel}
                        />
                    </OppsummeringPanel.Punkt>
                </Accordion>
                <DokumentasjonOppsummering
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.FRILANS)}
                    alleVedlegg={vedlegg}
                />
                <>
                    {manglerDokumentasjon && (
                        <Alert variant="info">
                            <VStack gap="2">
                                <Heading size="small" level="2">
                                    <FormattedMessage id="oppsummering.manglerDokumentasjon.heading" />
                                </Heading>
                                <BodyLong>
                                    <FormattedMessage id="oppsummering.manglerDokumentasjon.content" />
                                </BodyLong>
                            </VStack>
                        </Alert>
                    )}
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
                                    a: (msg: any) => (
                                        <a
                                            href={links.farskapsportal}
                                            className="lenke"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            {msg}
                                        </a>
                                    ),
                                    antallBarn: barn.antallBarn,
                                }}
                            />
                        </Alert>
                    )}
                </>
            </OppsummeringPanel>
        </ContentWrapper>
    );
};

export default Oppsummering;
