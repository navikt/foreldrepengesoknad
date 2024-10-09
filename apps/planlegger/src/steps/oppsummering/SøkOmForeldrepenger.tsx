import { TasklistStartIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { erBarnetAdoptert, erBarnetFødt } from 'utils/barnetUtils';

import { BodyShort, Button, HStack, Link, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Infobox } from '@navikt/fp-ui';

interface Props {
    erAlenesøker: boolean;
    barnet: OmBarnet;
}

const SøkOmForeldrepenger: React.FunctionComponent<Props> = ({ erAlenesøker, barnet }) => {
    return (
        <Infobox
            header={<FormattedMessage id="SøkOmForeldrepenger.Tittel" values={{ erAlenesøker }} />}
            color="gray"
            icon={<TasklistStartIcon aria-hidden height={24} width={24} />}
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
                    <Link href={links.søknadForeldrepenger} target="_blank" rel="noreferrer">
                        <Button variant="primary">
                            <FormattedMessage id="SøkOmForeldrepenger.Søk" />
                        </Button>
                    </Link>
                </HStack>
            </VStack>
        </Infobox>
    );
};
export default SøkOmForeldrepenger;
