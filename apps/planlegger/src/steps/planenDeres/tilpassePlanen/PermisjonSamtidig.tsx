import { PersonGroupIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    erAdopsjon?: boolean;
}

const PermisjonSamtidig: React.FunctionComponent<Props> = ({ erAdopsjon = false }) => {
    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonGroupIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="OmÅTilpassePlanen.PermisjonSamtidig" />
                </Heading>
                <BodyLong>
                    <FormattedMessage id="OmÅTilpassePlanen.PermisjonSamtidig.Tekst" values={{ erAdopsjon }} />
                </BodyLong>
            </div>
        </HStack>
    );
};
export default PermisjonSamtidig;
