import { ExpansionCard, HStack } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import Info from 'components/ikoner/Info';

const HvorforSpørViOmDette: FunctionComponent = () => {
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
            <ExpansionCard.Content>
                <FormattedMessage id="hvem.info.tekst" />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};
export default HvorforSpørViOmDette;
