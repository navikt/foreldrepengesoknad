import { PlusIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, Button, VStack } from '@navikt/ds-react';

interface Props {
    onClick?: () => void;
}

export const LeggTilAndreInntekterButton = ({ onClick }: Props) => {
    const intl = useIntl();

    return (
        <VStack gap="space-8" align="center">
            <BodyShort weight="semibold">
                <FormattedMessage id="LeggTilAndreInntekterButton.Spørsmål" />
            </BodyShort>
            <Button type="button" variant="secondary" size="small" icon={<PlusIcon aria-hidden />} onClick={onClick}>
                {intl.formatMessage({ id: 'LeggTilAndreInntekterButton.Knapp' })}
            </Button>
        </VStack>
    );
};
