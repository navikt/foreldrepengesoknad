import { ContextDataType, useContextGetData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useIntl } from 'react-intl';

import { BoIUtlandetOppsummering, OppsummeringPanel } from '@navikt/fp-steg-oppsummering';
import { SkjemaRotLayout } from '@navikt/fp-ui';
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
    const intl = useIntl();

    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const dokumentasjon = useContextGetData(ContextDataType.DOKUMENTASJON);
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}>
            <OppsummeringPanel
                appName="Engangsstønad"
                stepConfig={stepConfig}
                sendSøknad={sendSøknad}
                onAvsluttOgSlett={navigator.avbrytSøknad}
                goToPreviousStep={navigator.goToPreviousDefaultStep}
                onFortsettSenere={navigator.fortsettSøknadSenere}
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
        </SkjemaRotLayout>
    );
};
