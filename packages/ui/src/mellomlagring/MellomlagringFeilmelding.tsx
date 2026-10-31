import { FormattedMessage } from 'react-intl';

import { Alert, Button, VStack } from '@navikt/ds-react';

export type Mellomlagringsfeil = 'FEILET' | 'INGEN_TILGANG';

interface Props {
    feil: Mellomlagringsfeil;
    lukk: () => void;
}

export const MellomlagringFeilmelding = ({ feil, lukk }: Props) => (
    <VStack align="center" paddingBlock="space-16" paddingInline="space-16">
        <VStack maxWidth="600px" width="100%">
            <Alert variant="error">
                <VStack align="start" gap="space-8">
                    {feil === 'INGEN_TILGANG' ? (
                        <FormattedMessage id="MellomlagringFeilmelding.IngenTilgang" />
                    ) : (
                        <FormattedMessage id="MellomlagringFeilmelding.Feilet" />
                    )}
                    <Button type="button" variant="secondary" size="small" onClick={lukk}>
                        <FormattedMessage id="MellomlagringFeilmelding.Lukk" />
                    </Button>
                </VStack>
            </Alert>
        </VStack>
    </VStack>
);
