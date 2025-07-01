import { ContextDataType, useContextGetData } from 'appData/SvpDataContext';
import { SøknadRoute, addTilretteleggingIdToRoute } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { FormattedMessage } from 'react-intl';
import { getAktiveArbeidsforhold } from 'utils/arbeidsforholdUtils';
import { getTilretteleggingId } from 'utils/tilretteleggingUtils';

import { FormSummary } from '@navikt/ds-react';

import {
    ArbeidsforholdOppsummering,
    BoIUtlandetOppsummering,
    FrilansOppsummering,
    OppsummeringPanel,
    SelvstendigNæringsdrivendeOppsummering,
} from '@navikt/fp-steg-oppsummering';
import { Søkerinfo } from '@navikt/fp-types';
import { SkjemaRotLayout } from '@navikt/fp-ui';
import { formatDate } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { DokumentasjonOppsummering } from './DokumentasjonOppsummering';
import { FerieOppsummering } from './FerieOppsummering';
import { JobbetIUtlandetOppsummering } from './JobbetIUtlandetOppsummering';
import { PerioderOppsummering } from './PerioderOppsummering';

type Props = {
    sendSøknad: () => Promise<void>;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
};

export const OppsummeringSteg = ({ sendSøknad, mellomlagreSøknadOgNaviger, avbrytSøknad, søkerInfo }: Props) => {
    const stepConfig = useStepConfig(søkerInfo.arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, søkerInfo.arbeidsforhold);

    const tilretteleggingerVedlegg = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const utenlandsoppholdSenere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const utenlandsoppholdTidligere = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);
    const egenNæring = useContextGetData(ContextDataType.EGEN_NÆRING);
    const frilans = useContextGetData(ContextDataType.FRILANS);

    const aktiveArbeidsforhold = getAktiveArbeidsforhold(søkerInfo.arbeidsforhold, barn.termindato);

    const førsteTilretteleggingId = getTilretteleggingId(
        søkerInfo.arbeidsforhold,
        barn.termindato,
        arbeidsforholdOgInntekt,
        valgteArbeidsforhold,
    );

    return (
        <SkjemaRotLayout pageTitle={<FormattedMessage id="søknad.pageheading" />}>
            <OppsummeringPanel
                appName="Svangerskapspenger"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                onAvsluttOgSlett={avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onFortsettSenere={navigator.fortsettSøknadSenere}
                onStepChange={navigator.goToStep}
            >
                <FormSummary>
                    <FormSummary.Header>
                        <FormSummary.Heading level="2">
                            <FormattedMessage id="oppsummering.omBarnet" />
                        </FormSummary.Heading>
                        <FormSummary.EditLink onClick={() => navigator.goToStep(SøknadRoute.BARNET)}>
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
                    onVilEndreSvar={() => navigator.goToStep(SøknadRoute.UTENLANDSOPPHOLD)}
                    tidligereUtenlandsopphold={utenlandsoppholdTidligere ?? []}
                    senereUtenlandsopphold={utenlandsoppholdSenere ?? []}
                />
                <ArbeidsforholdOppsummering
                    arbeidsforholdOgInntekt={arbeidsforholdOgInntekt}
                    arbeidsforhold={aktiveArbeidsforhold}
                    onVilEndreSvar={() => navigator.goToStep(SøknadRoute.ARBEIDSFORHOLD_OG_INNTEKT)}
                />
                <FrilansOppsummering frilans={frilans} onVilEndreSvar={() => navigator.goToStep(SøknadRoute.FRILANS)} />
                <SelvstendigNæringsdrivendeOppsummering
                    egenNæring={egenNæring}
                    onVilEndreSvar={() => navigator.goToStep(SøknadRoute.NÆRING)}
                />
                <JobbetIUtlandetOppsummering onVilEndreSvar={() => navigator.goToStep(SøknadRoute.ARBEID_I_UTLANDET)} />
                <DokumentasjonOppsummering
                    tilretteleggingerVedlegg={tilretteleggingerVedlegg}
                    alleArbeidsforhold={søkerInfo.arbeidsforhold}
                    onVilEndreSvar={() =>
                        navigator.goToStep(addTilretteleggingIdToRoute(SøknadRoute.SKJEMA, førsteTilretteleggingId))
                    }
                />
                <PerioderOppsummering
                    alleArbeidsforhold={søkerInfo.arbeidsforhold}
                    onVilEndreSvar={() =>
                        navigator.goToStep(
                            addTilretteleggingIdToRoute(SøknadRoute.TILRETTELEGGING, førsteTilretteleggingId),
                        )
                    }
                />
                <FerieOppsummering
                    alleArbeidsforhold={søkerInfo.arbeidsforhold}
                    onVilEndreSvar={() =>
                        navigator.goToStep(addTilretteleggingIdToRoute(SøknadRoute.FERIE, førsteTilretteleggingId))
                    }
                />
            </OppsummeringPanel>
        </SkjemaRotLayout>
    );
};
