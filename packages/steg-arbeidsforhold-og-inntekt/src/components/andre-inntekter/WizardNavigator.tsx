import { FormattedMessage, useIntl } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

interface Props {
    isLastStep: boolean;
    isNextDisabled?: boolean;
    onCancel: () => void;
    onNext: () => void | Promise<void>;
    onBack?: () => void;
}

export const WizardNavigator = ({ isLastStep, isNextDisabled = false, onCancel, onNext, onBack }: Props) => {
    const intl = useIntl();

    return (
        <HStack justify="space-between" gap="space-16">
            <Button type="button" variant="tertiary" onClick={onCancel}>
                <FormattedMessage id="WizardNavigator.Avbryt" />
            </Button>
            <HStack gap="space-16">
                {onBack && (
                    <Button type="button" variant="secondary" onClick={onBack}>
                        <FormattedMessage id="WizardNavigator.Tilbake" />
                    </Button>
                )}
                <Button type="button" disabled={isNextDisabled} onClick={() => void onNext()}>
                    {isLastStep
                        ? intl.formatMessage({ id: 'WizardNavigator.LeggTil' })
                        : intl.formatMessage({ id: 'WizardNavigator.Fortsett' })}
                </Button>
            </HStack>
        </HStack>
    );
};
