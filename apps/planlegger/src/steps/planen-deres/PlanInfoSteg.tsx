import { BodyLong, BodyShort, ExpansionCard, Heading } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import Kalender from 'components/ikoner/Kalender';
import { FormattedMessage } from 'react-intl';
import Penn from 'components/ikoner/Penn';
import Check from 'components/ikoner/Check';
import PlanleggerRoutes from './../../routes/routes';
import { useNavigate } from 'react-router-dom';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';

const PlanInfoSteg = () => {
    const navigator = usePlanleggerNavigator();
    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <Heading size="large">
                <Block>
                    <FormattedMessage id="planInfo.tittel" />
                </Block>

                <Block margin="xxl">
                    <BodyLong size="large">
                        <FormattedMessage id="planInfo.ingress.del1" />
                    </BodyLong>
                </Block>
                <Block margin="xxl">
                    <BodyLong size="large">
                        <FormattedMessage id="planInfo.ingress.del2" />
                    </BodyLong>
                </Block>

                <Block margin="xxl">
                    <Heading level="2" size="xsmall">
                        <FormattedMessage id="planInfo.underoverskrift" />
                    </Heading>
                </Block>

                <Block margin="l">
                    <div className="list-content">
                        <div className="list-item">
                            <Kalender />
                        </div>
                        <div className="list-item">
                            <BodyShort>
                                <FormattedMessage id="planInfo.trinn1" />
                            </BodyShort>
                        </div>
                    </div>
                </Block>

                <Block margin="l">
                    <div className="list-content">
                        <div className="list-item">
                            <Penn />
                        </div>
                        <div className="list-item">
                            <BodyShort>
                                <FormattedMessage id="planInfo.trinn2" />
                            </BodyShort>
                        </div>
                    </div>
                </Block>

                <Block margin="l">
                    <div className="list-content">
                        <div className="list-item">
                            <Check />
                        </div>
                        <div className="list-item">
                            <BodyShort>
                                <FormattedMessage id="planInfo.trinn3" />
                            </BodyShort>
                        </div>
                    </div>
                </Block>

                <Block margin="xl">
                    <ExpansionCard aria-label="">
                        <ExpansionCard.Header>
                            <div>
                                <ExpansionCard.Title size="medium">
                                    <FormattedMessage id="planInfo.info.tittel" />
                                </ExpansionCard.Title>
                            </div>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <FormattedMessage id="planInfo.info.tekst" />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                </Block>

                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => navigate(PlanleggerRoutes.OVERSIKT)}
                        nextButtonText="Se oversikt"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </Heading>
        </ContentWrapper>
    );
};

export default PlanInfoSteg;
