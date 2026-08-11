import { Button, HStack } from '@navikt/ds-react';

interface Props {
    isLastStep: boolean;
    isNextDisabled?: boolean;
    onCancel: () => void;
    onNext: () => void | Promise<void>;
    onBack?: () => void;
}

export const WizardNavigator = ({ isLastStep, isNextDisabled = false, onCancel, onNext, onBack }: Props) => (
    <HStack justify="space-between" gap="space-16">
        <Button type="button" variant="tertiary" onClick={onCancel}>
            Avbryt
        </Button>
        <HStack gap="space-16">
            {onBack && (
                <Button type="button" variant="secondary" onClick={onBack}>
                    Tilbake
                </Button>
            )}
            <Button type="button" disabled={isNextDisabled} onClick={() => void onNext()}>
                {isLastStep ? 'Legg til' : 'Neste'}
            </Button>
        </HStack>
    </HStack>
);
