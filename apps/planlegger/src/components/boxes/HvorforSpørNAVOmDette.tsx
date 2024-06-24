import { InformationIcon } from '@navikt/aksel-icons';
import { FormattedMessage } from 'react-intl';

import { ExpansionCard, HStack } from '@navikt/ds-react';

import { IconCircleWrapper } from '@navikt/fp-ui';

interface Props {
    text: string;
}
const HvorforSpørNAVOmDette: React.FunctionComponent<Props> = ({ text }) => (
    <ExpansionCard aria-label="">
        <ExpansionCard.Header>
            <HStack gap="10" align="center">
                <IconCircleWrapper size="xl" color="green">
                    <InformationIcon height={25} width={25} aria-hidden />
                </IconCircleWrapper>
                <ExpansionCard.Title size="medium">
                    <FormattedMessage id="HvorforSpørNAVOmDette.Info.Tittel" />
                </ExpansionCard.Title>
            </HStack>
        </ExpansionCard.Header>
        <ExpansionCard.Content>{text}</ExpansionCard.Content>
    </ExpansionCard>
);

export default HvorforSpørNAVOmDette;
