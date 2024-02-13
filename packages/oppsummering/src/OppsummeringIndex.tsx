import { StepConfig } from '@navikt/fp-types';
import OppsummeringPanel from './OppsummeringPanel';
import { ReactElement } from 'react';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OppsummeringIntlProvider from './intl/OppsummeringIntlProvider';

export interface Props {
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    cancelApplication: () => void;
    onContinueLater: () => void;
    goToPreviousStep: () => void;
    stepConfig: StepConfig[];
    children: ReactElement[] | ReactElement;
    appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
    ekstraSamtykketekst?: string;
}

interface StaticFunctions {
    Punkt: typeof Oppsummeringspunkt;
}

const OppsummeringIndex: React.FunctionComponent<Props> & StaticFunctions = ({
    sendSøknad,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    stepConfig,
    children,
    appName,
    ekstraSamtykketekst,
}) => {
    return (
        <OppsummeringIntlProvider>
            <OppsummeringPanel
                sendSøknad={sendSøknad}
                cancelApplication={cancelApplication}
                onContinueLater={onContinueLater}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
                appName={appName}
                ekstraSamtykketekst={ekstraSamtykketekst}
            >
                {children}
            </OppsummeringPanel>
        </OppsummeringIntlProvider>
    );
};

OppsummeringIndex.Punkt = Oppsummeringspunkt;

export default OppsummeringIndex;
