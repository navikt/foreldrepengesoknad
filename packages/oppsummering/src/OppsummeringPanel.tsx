import { Accordion, ConfirmationPanel, VStack } from '@navikt/ds-react';
import { useAbortSignal } from '@navikt/fp-api';
import { Step } from '@navikt/fp-common';
import { StepConfig } from '@navikt/fp-types';
import { StepButtons } from '@navikt/fp-ui';
import { ReactElement, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import Oppsummeringspunkt from './Oppsummeringspunkt';

const getSamtykkeTekst = (intl: IntlShape, appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger') => {
    if (appName === 'Engangsstønad') {
        return intl.formatMessage({ id: 'OppsummeringPanel.Samtykke' });
    }
    throw new Error('Function not implemented.');
};

export interface Props {
    sendSøknad: (abortSignal: AbortSignal) => Promise<void>;
    cancelApplication: () => void;
    onContinueLater: () => void;
    goToPreviousStep: () => void;
    stepConfig: StepConfig[];
    children: ReactElement[] | ReactElement;
    appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
}

interface StaticFunctions {
    Punkt: typeof Oppsummeringspunkt;
}

const OppsummeringPanel: React.FunctionComponent<Props> & StaticFunctions = ({
    sendSøknad,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    stepConfig,
    children,
    appName,
}) => {
    const intl = useIntl();
    const abortSignal = useAbortSignal();

    const [isChecked, setChecked] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            setSubmitting(true);
            sendSøknad(abortSignal);
        }
    };

    return (
        <Step onCancel={cancelApplication} onContinueLater={onContinueLater} steps={stepConfig}>
            <VStack gap="10">
                <Accordion indent={false}>{children}</Accordion>
                <ConfirmationPanel
                    label={getSamtykkeTekst(intl, appName)}
                    onChange={() => setChecked((state) => !state)}
                    checked={isChecked}
                    error={
                        isError &&
                        !isChecked &&
                        intl.formatMessage({ id: 'OppsummeringPanel.Validering.BekrefteOpplysninger' })
                    }
                />
                <StepButtons
                    goToPreviousStep={goToPreviousStep}
                    nextButtonOnClick={send}
                    isDisabledAndLoading={isSubmitting}
                    isSendButton
                />
            </VStack>
        </Step>
    );
};

OppsummeringPanel.Punkt = Oppsummeringspunkt;

export default OppsummeringPanel;
