import { PersonGroupIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

const PermisjonSamtidig: React.FunctionComponent = () => {
    return (
        <HStack gap="5" align="start" wrap={false} justify="space-between">
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
                    <FormattedMessage id="OmÅTilpassePlanen.PermisjonSamtidig.Tekst" />
                </BodyLong>
            </div>
        </HStack>
    );
};
export default PermisjonSamtidig;
