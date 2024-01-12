import { ExpansionCard, HStack } from '@navikt/ds-react';
import { FormattedMessage } from 'react-intl';
import Info from 'components/ikoner/Info';

interface Props {
    text: string;
}
const HvorforSpørViOmDette: React.FunctionComponent<Props> = ({ text }) => {
    return (
        <ExpansionCard aria-label="">
            <ExpansionCard.Header>
                <HStack gap="10" align="center">
                    <Info />
                    <ExpansionCard.Title size="medium">
                        <FormattedMessage id="hvem.info.tittel" />
                    </ExpansionCard.Title>
                </HStack>
            </ExpansionCard.Header>
            <ExpansionCard.Content>{text}</ExpansionCard.Content>
        </ExpansionCard>
    );
};
export default HvorforSpørViOmDette;
