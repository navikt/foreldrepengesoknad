import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Accordion, BodyShort, FormSummary, Heading, VStack } from '@navikt/ds-react';

import { BoIUtlandetOppsummeringspunkt, OppsummeringPanel } from '@navikt/fp-oppsummering';
import { Søkerinfo } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { bemUtils, formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { ContextDataType, useContextGetData, useContextSaveData } from 'app/appData/SvpDataContext';
import SøknadRoutes from 'app/appData/routes';
import useStepConfig from 'app/appData/useStepConfig';
import useSvpNavigator from 'app/appData/useSvpNavigator';
import {
    ArbeidsforholdOppsummering,
    FrilansSummary,
    JobbetIUtlandetSummary,
    SelvstendigNæringsdrivendeSummary,
} from 'app/steps/oppsummering/ArbeidsforholdOppsummering';
import { DokumentasjonOppsummering } from 'app/steps/oppsummering/DokumentasjonOppsummering';
import { PerioderOppsummering } from 'app/steps/oppsummering/PerioderOppsummering';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import { getAktiveArbeidsforhold } from 'app/utils/arbeidsforholdUtils';
import { getSisteDagForSvangerskapspenger } from 'app/utils/dateUtils';
import { mapTilretteleggingTilPerioder } from 'app/utils/tilretteleggingUtils';

import './oppsummering.css';
import PeriodeOppsummering from './periode-oppsummering/PeriodeOppsummering';

type Props = {
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

const Oppsummering: React.FunctionComponent<Props> = ({
    sendSøknad,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, søkerInfo.arbeidsforhold);
    const bem = bemUtils('oppsummering');

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsoppholdSenere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdTidligere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);

    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const sisteDagForSvangerskapspenger = getSisteDagForSvangerskapspenger(barn);
    const allePerioderMedFomOgTom = useMemo(
        () => mapTilretteleggingTilPerioder(tilrettelegginger, sisteDagForSvangerskapspenger),
        [tilrettelegginger, sisteDagForSvangerskapspenger],
    );
    const aktiveArbeidsforhold = getAktiveArbeidsforhold(søkerInfo.arbeidsforhold, barn.termindato);
    const tilretteleggingMedFrilans = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER,
    );
    const tilretteleggingMedSN = tilrettelegginger.find(
        (t) => t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG,
    );

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <OppsummeringPanel
                appName="Svangerskapspenger"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={avbrytSøknad}
                goToPreviousStep={() => {
                    oppdaterValgtTilretteleggingId(tilrettelegginger[tilrettelegginger?.length - 1].id);
                    navigator.goToPreviousDefaultStep();
                }}
                onContinueLater={navigator.fortsettSøknadSenere}
            >
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">
                            <FormattedMessage id="oppsummering.omBarnet" />
                        </FormSummary.Heading>
                        <FormSummary.EditLink onClick={() => navigator.goToNextStep(SøknadRoutes.BARNET)}>
                            <FormattedMessage id="oppsummering.EndreSvar" />
                        </FormSummary.EditLink>
                    </FormSummary.Header>
                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>
                                <FormattedMessage id="barnet.termindato" />
                            </FormSummary.Label>
                            <FormSummary.Value>{formatDate(barn.termindato)}</FormSummary.Value>
                        </FormSummary.Answer>
                        {barn.erBarnetFødt && barn.fødselsdato && (
                            <FormSummary.Answer>
                                <FormSummary.Label>
                                    <FormattedMessage id="barnet.fødselsdato" />
                                </FormSummary.Label>
                                <FormSummary.Value>{formatDate(barn.fødselsdato)}</FormSummary.Value>
                            </FormSummary.Answer>
                        )}
                    </FormSummary.Answers>
                </FormSummary>
                <BoIUtlandetOppsummeringspunkt
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.UTENLANDSOPPHOLD)}
                    tidligereUtenlandsopphold={utenlandsoppholdTidligere?.utenlandsoppholdSiste12Mnd ?? []}
                    senereUtenlandsopphold={utenlandsoppholdSenere?.utenlandsoppholdNeste12Mnd ?? []}
                />
                <ArbeidsforholdOppsummering
                    arbeidsforhold={aktiveArbeidsforhold}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.INNTEKTSINFORMASJON)}
                />
                <FrilansSummary onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.FRILANS)} />
                <SelvstendigNæringsdrivendeSummary onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.NÆRING)} />
                <JobbetIUtlandetSummary onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.ARBEID_I_UTLANDET)} />
                <DokumentasjonOppsummering
                    tilrettelegginger={tilrettelegginger}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.TILRETTELEGGING)}
                />
                <PerioderOppsummering onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.PERIODER)} />
                <Accordion indent={false}>
                    <OppsummeringPanel.Punkt
                        tittel={intl.formatMessage({ id: 'oppsummering.periodeMedSvangerskapspenger' })}
                    >
                        <VStack gap="2">
                            {tilretteleggingMedFrilans && (
                                <VStack gap="2">
                                    <div>
                                        <BodyShort className={bem.element('label')}>
                                            Risikofaktorer i jobben din som frilanser:
                                        </BodyShort>
                                        <BodyShort>{tilretteleggingMedFrilans.risikofaktorer}</BodyShort>
                                    </div>
                                    <div>
                                        <BodyShort className={bem.element('label')}>
                                            Tilretteleggingstiltak i jobben din som frilanser:
                                        </BodyShort>
                                        <BodyShort>{tilretteleggingMedFrilans.tilretteleggingstiltak}</BodyShort>
                                    </div>
                                </VStack>
                            )}
                            {tilretteleggingMedSN && (
                                <VStack gap="2">
                                    <div>
                                        <BodyShort
                                            className={bem.element('label')}
                                        >{`Risikofaktorer i ${tilretteleggingMedSN.arbeidsforhold.navn}`}</BodyShort>
                                        <BodyShort>{tilretteleggingMedSN.risikofaktorer}</BodyShort>
                                    </div>
                                    <div>
                                        <BodyShort className={bem.element('label')}>
                                            {`Tilretteleggingstiltak i ${tilretteleggingMedSN.arbeidsforhold.navn}`}
                                        </BodyShort>
                                        <BodyShort>{tilretteleggingMedSN.tilretteleggingstiltak}</BodyShort>
                                    </div>
                                </VStack>
                            )}
                            <PeriodeOppsummering
                                perioder={allePerioderMedFomOgTom}
                                sisteDagForSvangerskapspenger={sisteDagForSvangerskapspenger}
                                barn={barn}
                            />
                        </VStack>
                    </OppsummeringPanel.Punkt>
                </Accordion>
            </OppsummeringPanel>
        </ContentWrapper>
    );
};

export default Oppsummering;
