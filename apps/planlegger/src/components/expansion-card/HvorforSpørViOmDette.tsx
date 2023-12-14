import { ExpansionCard } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Block } from '@navikt/fp-common';
import Info from 'components/ikoner/Info';

const HvorforSpørViOmDette: FunctionComponent = () => {
    return (
        <Block margin="xl">
            <ExpansionCard aria-label="">
                <ExpansionCard.Header>
                    <div className="with-icon">
                        <div>
                            <Info />
                        </div>
                        <div>
                            <ExpansionCard.Title size="medium">
                                <FormattedMessage id="hvem.info.tittel" />
                            </ExpansionCard.Title>
                        </div>
                    </div>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <FormattedMessage id="hvem.info.tekst" />
                </ExpansionCard.Content>
            </ExpansionCard>
        </Block>
    );
};
export default HvorforSpørViOmDette;
