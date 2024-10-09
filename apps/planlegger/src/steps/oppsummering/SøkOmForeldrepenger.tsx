import { BookmarkIcon, LinkIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';

import { BodyShort, Button, HStack, VStack } from '@navikt/ds-react';

import { logAmplitudeEvent } from '@navikt/fp-metrics';
import { Infobox } from '@navikt/fp-ui';

const copyUrlToClipboard = async () => {
    logAmplitudeEvent('applikasjon-hendelse', {
        app: 'planlegger',
        team: 'foreldrepenger',
        pageKey: 'copy-url',
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
    barnet: OmBarnet;
}

const SøkOmForeldrepenger: React.FunctionComponent<Props> = ({ erAlenesøker, barnet }) => {
    const intl = useIntl();
    return (
        <Infobox
            header={<FormattedMessage id="SøkOmForeldrepenger.Tittel" values={{ erAlenesøker }} />}
            color="gray"
            icon={<BookmarkIcon aria-hidden height={24} width={24} />}
        >
            <VStack gap="4">
                <BodyShort>
                    <FormattedMessage
                        id="SøkOmForeldrepenger.BasertPå"
                        values={{
                            erAlenesøker,
                            erAdopsjon: erBarnetAdoptert(barnet),
                            erFødt: erBarnetFødt(barnet),
                        }}
                    />
                </BodyShort>
                <HStack>
                    <Button variant="primary" onClick={copyUrlToClipboard}>
                        <FormattedMessage id="OppsummeringSteg.KopierUrl" />
                    </Button>
                </HStack>
            </VStack>
        </Infobox>
    );
};
export default SøkOmForeldrepenger;
