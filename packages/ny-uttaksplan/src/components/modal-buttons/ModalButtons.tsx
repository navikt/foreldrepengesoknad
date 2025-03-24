import { Button, HStack } from '@navikt/ds-react';

interface Props {
    onCancel: () => void;
    onGoPreviousStep?: () => void;
    isFinalStep: boolean;
}

export const ModalButtons = ({ onCancel, onGoPreviousStep, isFinalStep }: Props) => {
    return (
        <HStack gap="2" justify="space-between">
            <Button type="button" variant="secondary" onClick={onCancel}>
                Avbryt
            </Button>
            <HStack gap="2">
                {onGoPreviousStep && (
                    <Button type="button" variant="secondary" onClick={onGoPreviousStep}>
                        Gå tilbake
                    </Button>
                )}
                <Button>{isFinalStep ? 'Ferdig, legg til i planen' : 'Gå videre'}</Button>
            </HStack>
        </HStack>
    );
};
