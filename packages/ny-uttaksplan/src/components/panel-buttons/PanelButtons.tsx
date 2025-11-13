import { FormattedMessage } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

interface Props {
    onCancel: () => void;
    onGoPreviousStep?: () => void;
    isFinalStep: boolean;
    addButtonText?: string;
}

export const PanelButtons = ({ onCancel, onGoPreviousStep, isFinalStep, addButtonText }: Props) => {
    const finalStepLabel = isFinalStep ? (
        <FormattedMessage id="uttaksplan.ferdig" />
    ) : (
        <FormattedMessage id="uttaksplan.gåVidere" />
    );

    return (
        <HStack gap="space-8" justify="space-between">
            <Button type="button" variant="secondary" onClick={onCancel}>
                <FormattedMessage id="uttaksplan.avbryt" />
            </Button>
            <HStack gap="space-8">
                {onGoPreviousStep && (
                    <Button type="button" variant="secondary" onClick={onGoPreviousStep}>
                        <FormattedMessage id="uttaksplan.gåTilbake" />
                    </Button>
                )}
                <Button>{addButtonText ?? finalStepLabel}</Button>
            </HStack>
        </HStack>
    );
};
