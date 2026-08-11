import { PlusIcon } from '@navikt/aksel-icons';

import { BodyShort, Button, VStack } from '@navikt/ds-react';

export const LeggTilAndreInntekterButton = () => {
    return (
        <VStack gap="space-8" align="center">
            <BodyShort weight="semibold">Mangler en inntektskilde?</BodyShort>
            <Button type="button" variant="secondary" size="small" icon={<PlusIcon aria-hidden />}>
                Legg til inntekt
            </Button>
        </VStack>
    );
};
