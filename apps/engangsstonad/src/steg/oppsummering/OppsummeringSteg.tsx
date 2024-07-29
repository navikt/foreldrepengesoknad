import { ContextDataType, useContextGetData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { BoIUtlandetOppsummeringspunkt, OppsummeringPanel } from '@navikt/fp-oppsummering';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { DokumentasjonOppsummering } from './DokumentasjonOppsummering';
import OmBarnetOppsummering from './OmBarnetOppsummering';

export interface Props {
    readonly sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    readonly mellomlagreOgNaviger: () => Promise<void>;
}

const OppsummeringSteg = ({ sendSøknad, mellomlagreOgNaviger }: Props) => {
    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const dokumentasjon = useContextGetData(ContextDataType.DOKUMENTASJON);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="Søknad.Pageheading" />
            </Heading>
            <OppsummeringPanel
                appName="Engangsstønad"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                cancelApplication={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onContinueLater={navigator.fortsettSøknadSenere}
            >
                <OmBarnetOppsummering
                    omBarnet={omBarnet}
                    onVilEndreSvar={() => navigator.goToNextStep(Path.OM_BARNET)}
                />
                <BoIUtlandetOppsummeringspunkt
                    onVilEndreSvar={() => navigator.goToNextStep(Path.UTENLANDSOPPHOLD)}
                    tidligereUtenlandsopphold={tidligereUtenlandsopphold?.utenlandsoppholdSiste12Mnd ?? []}
                    senereUtenlandsopphold={senereUtenlandsopphold?.utenlandsoppholdNeste12Mnd ?? []}
                />
                <DokumentasjonOppsummering dokumentasjon={dokumentasjon} onVilEndreSvar={navigator.goToNextStep} />
            </OppsummeringPanel>
        </ContentWrapper>
    );
};

export default OppsummeringSteg;
