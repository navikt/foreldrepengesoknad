import { ReactElement } from 'react';

import { ProgressStep } from '@navikt/fp-ui';

import OppsummeringPanel from './OppsummeringPanel';
import Oppsummeringspunkt from './Oppsummeringspunkt';
import OppsummeringIntlProvider from './intl/OppsummeringIntlProvider';

export interface Props<TYPE> {
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    cancelApplication: () => void;
    onContinueLater: () => void;
    goToPreviousStep: () => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    children: ReactElement[] | ReactElement;
    appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
    ekstraSamtykketekst?: string;
}

const OppsummeringIndex = <TYPE extends string>({
    sendSøknad,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    stepConfig,
    children,
    appName,
    ekstraSamtykketekst,
}: Props<TYPE>) => {
    return (
        <OppsummeringIntlProvider>
            <OppsummeringPanel<TYPE>
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
