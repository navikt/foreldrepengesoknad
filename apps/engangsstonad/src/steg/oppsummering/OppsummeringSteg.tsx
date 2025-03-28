import { ContextDataType, useContextGetData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { FormattedMessage } from 'react-intl';

import { Heading } from '@navikt/ds-react';

import { BoIUtlandetOppsummering, OppsummeringPanel } from '@navikt/fp-steg-oppsummering';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { DokumentasjonOppsummering } from './DokumentasjonOppsummering';
import { OmBarnetOppsummering } from './OmBarnetOppsummering';

export interface Props {
    sendSøknad: () => Promise<void>;
    mellomlagreOgNaviger: () => Promise<void>;
}

export const OppsummeringSteg = ({ sendSøknad, mellomlagreOgNaviger }: Props) => {
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
                onStepChange={navigator.goToNextStep}
            >
                <OmBarnetOppsummering
                    omBarnet={omBarnet}
                    onVilEndreSvar={() => navigator.goToNextStep(Path.OM_BARNET)}
                />
                <BoIUtlandetOppsummering
                    onVilEndreSvar={() => navigator.goToNextStep(Path.UTENLANDSOPPHOLD)}
                    tidligereUtenlandsopphold={tidligereUtenlandsopphold ?? []}
                    senereUtenlandsopphold={senereUtenlandsopphold ?? []}
                />
                <DokumentasjonOppsummering dokumentasjon={dokumentasjon} onVilEndreSvar={navigator.goToNextStep} />
            </OppsummeringPanel>
        </ContentWrapper>
    );
};
