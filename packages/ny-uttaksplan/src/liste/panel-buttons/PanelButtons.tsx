import { FormattedMessage } from 'react-intl';

import { Button, HStack } from '@navikt/ds-react';

interface Props {
    onCancel: () => void;
    onGoPreviousStep?: () => void;
}

export const PanelButtons = ({ onCancel, onGoPreviousStep }: Props) => {
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
                <Button type="submit">
                    <FormattedMessage id="uttaksplan.ferdig" />
                </Button>
            </HStack>
        </HStack>
    );
};
