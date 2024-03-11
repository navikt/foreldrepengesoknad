import { InformationIcon } from '@navikt/aksel-icons';
import IconCircle from 'components/ikoner/IconCircle';
import { FormattedMessage } from 'react-intl';

import { ExpansionCard, HStack } from '@navikt/ds-react';

interface Props {
    text: string;
}
const HvorforSpørNAVOmDette: React.FunctionComponent<Props> = ({ text }) => {
    return (
        <ExpansionCard aria-label="">
            <ExpansionCard.Header>
                <HStack gap="10" align="center">
                    <IconCircle size="xl" color="green">
                        <InformationIcon height={25} width={25} />
                    </IconCircle>
                    <ExpansionCard.Title size="medium">
                        <FormattedMessage id="hvem.info.tittel" />
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>{text}</ExpansionCard.Content>
        </ExpansionCard>
    );
};
export default HvorforSpørNAVOmDette;
