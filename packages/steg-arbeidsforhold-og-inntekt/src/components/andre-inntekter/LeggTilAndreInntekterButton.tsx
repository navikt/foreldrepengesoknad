import { PlusIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, VStack } from '@navikt/ds-react';

export const LeggTilAndreInntekterButton = () => {
    return (
        <VStack
            gap="space-8"
            align="center"
            paddingBlock="space-16"
            paddingInline="space-20"
            className="rounded-xl border border-dashed border-ax-border-neutral bg-ax-bg-input"
        >
            <BodyShort weight="semibold">Mangler en inntektskilde?</BodyShort>
            <Button type="button" variant="secondary" size="small" icon={<PlusIcon aria-hidden />}>
                <FormattedMessage id="inntektsinformasjon.leggTilAndreInntekter" />
            </Button>
        </VStack>
    );
};
