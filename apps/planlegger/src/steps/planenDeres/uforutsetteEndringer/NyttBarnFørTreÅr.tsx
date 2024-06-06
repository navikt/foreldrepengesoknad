import { PersonPregnantIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

const NyttBarnFørTreÅr: React.FunctionComponent = () => {
    return (
        <HStack gap="5" wrap={false}>
            <div>
                <IconCircleWrapper color="lightBlue" size="medium">
                    <PersonPregnantIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                </IconCircleWrapper>
            </div>
            <div>
                <Heading size="small">
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr" />
                </Heading>
                <BodyLong>
                    <FormattedMessage id="UforutsetteEndringer.UforutsetteEndringer.HvisManFårNyttBarnFørTreÅr.Tekst" />
                </BodyLong>
            </div>
        </HStack>
    );
};
export default NyttBarnFørTreÅr;
