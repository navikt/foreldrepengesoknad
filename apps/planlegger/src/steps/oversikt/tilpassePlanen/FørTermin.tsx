import { PersonPregnantIcon } from '@navikt/aksel-icons';
import IconCircleWrapper from 'components/iconCircle/IconCircleWrapper';
import { FormattedMessage } from 'react-intl';
import { OmBarnet } from 'types/Barnet';

import { BodyLong, HStack, Heading } from '@navikt/ds-react';

interface Props {
    barnet: OmBarnet;
}
const FørTermin: React.FunctionComponent<Props> = ({ barnet }) => {
    const antallBarn = barnet.antallBarn;
    return (
        <>
            <HStack gap="5" align="start" wrap={false} justify="space-between">
                <div>
                    <IconCircleWrapper color="lightBlue" size="medium">
                        <PersonPregnantIcon height={22} width={22} fontSize="1.5rem" color="#0067C5" aria-hidden />
                    </IconCircleWrapper>
                </div>
                <div>
                    <Heading size="small">
                        <FormattedMessage id="OmÅTilpassePlanen.FørTermin" />
                    </Heading>
                    <BodyLong>
                        <FormattedMessage id="OmÅTilpassePlanen.FørTermin.Tekst" values={{ antallBarn }} />
                    </BodyLong>
                </div>
            </HStack>
        </>
    );
};
export default FørTermin;
