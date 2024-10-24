import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import SøknadRoutes from 'appData/routes';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { useTilretteleggingerHelper } from 'appData/useTilretteleggingerHelper';
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
    const { fjernValgtTilretteleggingOgNavigerTilbakeTil } = useTilretteleggingerHelper();

    const tilretteleggingerVedlegg = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const utenlandsoppholdSenere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdTidligere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const frilans = useContextGetData(ContextDataType.FRILANS);

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
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onContinueLater={navigator.fortsettSøknadSenere}
            >
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">
                            <FormattedMessage id="oppsummering.omBarnet" />
                        </FormSummary.Heading>
                        <FormSummary.EditLink
                            onClick={() => fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.BARNET)}
                        >
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
                    onVilEndreSvar={() => fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.UTENLANDSOPPHOLD)}
                    tidligereUtenlandsopphold={utenlandsoppholdTidligere ?? []}
                    senereUtenlandsopphold={utenlandsoppholdSenere ?? []}
                />
                <ArbeidsforholdOppsummering
                    arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                    arbeidsforhold={aktiveArbeidsforhold}
                    onVilEndreSvar={() =>
                        fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.INNTEKTSINFORMASJON)
                    }
                />
                <FrilansOppsummering
                    frilans={frilans}
                    onVilEndreSvar={() => fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.FRILANS)}
                />
                <SelvstendigNæringsdrivendeOppsummering
                    egenNæring={egenNæring}
                    onVilEndreSvar={() => fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.NÆRING)}
                />
                <JobbetIUtlandetOppsummering
                    onVilEndreSvar={() => fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.ARBEID_I_UTLANDET)}
                />
                <DokumentasjonOppsummering
                    tilretteleggingerVedlegg={tilretteleggingerVedlegg}
                    alleArbeidsforhold={søkerInfo.arbeidsforhold}
                    onVilEndreSvar={() => fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.SKJEMA)}
                />
                <PerioderOppsummering
                    alleArbeidsforhold={søkerInfo.arbeidsforhold}
                    onVilEndreSvar={() => fjernValgtTilretteleggingOgNavigerTilbakeTil(SøknadRoutes.TILRETTELEGGING)}
                />
            </OppsummeringPanel>
        </ContentWrapper>
    );
};

export default Oppsummering;
