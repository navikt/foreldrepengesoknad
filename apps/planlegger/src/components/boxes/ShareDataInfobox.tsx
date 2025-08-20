import { BookmarkIcon, LinkIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { Infobox } from '@navikt/fp-ui';

const copyUrlToClipboard = async () => {
    loggAmplitudeEvent({
        origin: 'planlegger',
        eventName: 'kopier',
        eventData: { tittel: 'OppsummeringSteg.KopierUrl' },
    });
    try {
        await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to copy: ', err);
    }
};

interface Props {
    erAlenesøker: boolean;
}

export const ShareDataInfobox = ({ erAlenesøker }: Props) => (
    <Infobox
        header={<FormattedMessage id="OmPlanleggerenSteg.TaVarePåHeader" values={{ erAlenesøker }} />}
        color="gray"
        icon={<BookmarkIcon aria-hidden height={24} width={24} />}
    >
        <VStack gap="space-16">
            <BodyShort>
                <FormattedMessage id="OmPlanleggerenSteg.TaVarePå" values={{ erAlenesøker }} />
            </BodyShort>
            <HStack>
                <Button
                    variant="primary"
                    icon={<LinkIcon aria-hidden height={24} width={24} />}
                    onClick={copyUrlToClipboard}
                >
                    <FormattedMessage id="OppsummeringSteg.KopierUrl" />
                </Button>
            </HStack>
        </VStack>
    </Infobox>
);
