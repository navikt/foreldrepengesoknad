import { ReactNode, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

import { ConfirmationPanel, VStack } from '@navikt/ds-react';

import { ProgressStep, Step, StepButtons } from '@navikt/fp-ui';

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

interface Props<TYPE> {
    sendSøknad: () => Promise<void>;
    onAvsluttOgSlett: () => void;
    onFortsettSenere: () => void;
    goToPreviousStep: () => void;
    onStepChange?: (id: TYPE) => void;
    stepConfig: Array<ProgressStep<TYPE>>;
    children: ReactNode;
    appName: 'Foreldrepenger' | 'Engangsstønad' | 'Svangerskapspenger';
    ekstraSamtykketekst?: string;
}

export const OppsummeringPanel = <TYPE extends string>({
    sendSøknad,
    onAvsluttOgSlett,
    onFortsettSenere,
    goToPreviousStep,
    onStepChange,
    stepConfig,
    children,
    appName,
    ekstraSamtykketekst,
}: Props<TYPE>) => {
    const intl = useIntl();

    const [isChecked, setIsChecked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);

    const send = () => {
        if (isChecked) {
            setIsSubmitting(true);
            sendSøknad();
        } else {
            setIsError(true);
        }
    };

    return (
        <Step steps={stepConfig} onStepChange={onStepChange} noFieldsRequired>
            <VStack gap="space-40">
                <VStack gap="space-12">{children}</VStack>
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
                    onAvsluttOgSlett={onAvsluttOgSlett}
                    onFortsettSenere={onFortsettSenere}
                    goToPreviousStep={goToPreviousStep}
                    nextButtonOnClick={send}
                    isDisabledAndLoading={isSubmitting}
                    isSendButton
                />
            </VStack>
        </Step>
    );
};

export const JaNeiTekst = ({ ja }: { ja: boolean }) => {
    return ja ? <FormattedMessage id="ja" /> : <FormattedMessage id="nei" />;
};
