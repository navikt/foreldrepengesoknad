import { BookmarkIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, CopyButton, HStack, VStack } from '@navikt/ds-react';

import { loggUmamiEvent } from '@navikt/fp-metrics';
import { Infobox } from '@navikt/fp-ui';

const logCopyEvent = () => {
    loggUmamiEvent({
        origin: 'planlegger',
        eventName: 'kopier',
        eventData: { tittel: 'OppsummeringSteg.KopierUrl' },
    });
};

interface Props {
    erAlenesøker: boolean;
}

export const ShareDataInfobox = ({ erAlenesøker }: Props) => {
    const intl = useIntl();
    return (
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
                    <CopyButton
                        className="bg-ax-bg-accent-strong hover:bg-ax-bg-accent-strong-hover text-ax-text-neutral-contrast"
                        copyText={globalThis.location.href}
                        text={intl.formatMessage({ id: 'OppsummeringSteg.KopierUrl' })}
                        activeText={intl.formatMessage({ id: 'OppsummeringSteg.KopiertUrl' })}
                        variant="action"
                        onClick={logCopyEvent}
                    />
                </HStack>
            </VStack>
        </Infobox>
    );
};
