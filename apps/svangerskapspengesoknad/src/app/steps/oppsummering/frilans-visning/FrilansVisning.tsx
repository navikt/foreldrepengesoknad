import { FunctionComponent } from 'react';

import { BodyShort, Box, VStack } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

import { Frilans } from 'app/types/Frilans';

interface Props {
    frilans: Frilans;
}

const FrilansVisning: FunctionComponent<Props> = ({ frilans }) => {
    const frilansTekst = 'Arbeid som frilanser';
    const tilTekst = !frilans.jobberFremdelesSomFrilans ? '(Avsluttet)' : '(Pågående)';
    return (
        <Box padding="4" background="surface-action-subtle" borderRadius="medium">
            <VStack gap="4">
                <BodyShort style={{ fontWeight: 'bold' }}>{frilansTekst}</BodyShort>
                <BodyShort>{`Startet: ${formatDate(frilans.oppstart)} ${tilTekst}`}</BodyShort>
            </VStack>
        </Box>
    );
};

export default FrilansVisning;
