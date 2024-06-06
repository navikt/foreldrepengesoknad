import { BriefcaseIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

const JobbeSamtidig: React.FunctionComponent = () => {
    return (
        <>
            <HStack gap="5" wrap={false}>
                <div>
                    <IconCircleWrapper color="lightBlue" size="medium">
                        <BriefcaseIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                    </IconCircleWrapper>
                </div>
                <div>
                    <Heading size="small">
                        <FormattedMessage id="OmÅTilpassePlanen.JobbeSamtidig" />
                    </Heading>
                    <BodyLong>
                        <FormattedMessage id="OmÅTilpassePlanen.JobbeSamtidig.Tekst" />
                    </BodyLong>
                </div>
            </HStack>
        </>
    );
};
export default JobbeSamtidig;
