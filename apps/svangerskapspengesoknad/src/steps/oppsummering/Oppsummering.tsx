import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';

import { FormSummary, Heading } from '@navikt/ds-react';

import {
    ArbeidsforholdOppsummering,
    BoIUtlandetOppsummering,
    FrilansOppsummering,
    OppsummeringPanel,
    SelvstendigNæringsdrivendeOppsummering,
} from '@navikt/fp-steg-oppsummering';
import { Søkerinfo } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { DokumentasjonOppsummering } from './DokumentasjonOppsummering';
import { JobbetIUtlandetOppsummering } from './JobbetIUtlandetOppsummering';
import { PerioderOppsummering } from './PerioderOppsummering';

type Props = {
    sendSøknad: () => Promise<void>;
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
    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, søkerInfo.arbeidsforhold);

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsoppholdSenere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdTidligere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));

    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(søkerInfo.arbeidsforhold, barn.termindato);

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
                onStepChange={navigator.goToNextStep}
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
                <BoIUtlandetOppsummering
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.UTENLANDSOPPHOLD)}
                    tidligereUtenlandsopphold={utenlandsoppholdTidligere ?? []}
                    senereUtenlandsopphold={utenlandsoppholdSenere ?? []}
                />
                <ArbeidsforholdOppsummering
                    arbeidsforholdOgInntekt={inntektsinformasjon}
                    arbeidsforhold={aktiveArbeidsforhold}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.INNTEKTSINFORMASJON)}
                />
                <FrilansOppsummering onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.FRILANS)} />
                <SelvstendigNæringsdrivendeOppsummering
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.NÆRING)}
                />
                <JobbetIUtlandetOppsummering
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.ARBEID_I_UTLANDET)}
                />
                <DokumentasjonOppsummering
                    tilrettelegginger={tilrettelegginger}
                    onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.SKJEMA)}
                />
                <PerioderOppsummering onVilEndreSvar={() => navigator.goToNextStep(SøknadRoutes.TILRETTELEGGING)} />
            </OppsummeringPanel>
        </ContentWrapper>
    );
};

export default Oppsummering;
