import { ReactElement, useState } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { ConfirmationPanel, VStack } from '@navikt/ds-react';

import { useAbortSignal } from '@navikt/fp-api';
import { ProgressStep, Step, StepButtons } from '@navikt/fp-ui';

import Oppsummeringspunkt from './Oppsummeringspunkt';

const getSamtykkeTekst = (
    intl: IntlShape,
    appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger',
    ekstraSamtykketekst?: string,
) => {
    if (appName === 'Engangsstønad') {
        return intl.formatMessage({ id: 'OppsummeringPanel.SamtykkeEs' });
    }
    if (appName === 'Foreldrepenger' && ekstraSamtykketekst !== undefined) {
        return intl.formatMessage({ id: 'OppsummeringPanel.SamtykkeFp' }).concat(ekstraSamtykketekst);
    }
    if (appName === 'Svangerskapspenger') {
        return intl.formatMessage({ id: 'OppsummeringPanel.SamtykkeSvp' });
    }
    throw new Error(`appName ${appName} not supported`);
};

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

const OppsummeringPanel = <TYPE extends string>({
    sendSøknad,
    cancelApplication,
    onContinueLater,
    goToPreviousStep,
    stepConfig,
    children,
    appName,
    ekstraSamtykketekst,
}: Props<TYPE>) => {
    const intl = useIntl();
    const abortSignal = useAbortSignal();

    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = () => {
        if (!isChecked) {
            setIsError(true);
        } else {
            setIsSubmitting(true);
            sendSøknad(abortSignal);
        }
    };

    return (
        <Step onCancel={cancelApplication} onContinueLater={onContinueLater} steps={stepConfig}>
            <VStack gap="10">
                <VStack gap="3">{children}</VStack>
                <ConfirmationPanel
                    label={getSamtykkeTekst(intl, appName, ekstraSamtykketekst)}
                    onChange={() => setIsChecked((state) => !state)}
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
