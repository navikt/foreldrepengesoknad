import { BodyShort, ExpansionCard, Heading, Ingress } from '@navikt/ds-react';
import { Block, StepButtonWrapper } from '@navikt/fp-common';
import { ContentWrapper } from '@navikt/fp-ui';
import Kalender from 'components/ikoner/Kalender';
import { FormattedMessage } from 'react-intl';
import Penn from 'components/ikoner/Penn';
import Check from 'components/ikoner/Check';
import { StepButtonsHookForm } from '@navikt/fp-form-hooks';
import useEsNavigator from 'appData/useEsNavigator';
import PlanleggerRoutes from './../../routes/routes';
import { useNavigate } from 'react-router-dom';

const PlanInfoSteg = () => {
    const navigator = useEsNavigator();
    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <Heading size="large">
                <Block>
                    <FormattedMessage id="planInfo.tittel" />
                </Block>

                <Block margin="xxl">
                    <Ingress>
                        <FormattedMessage id="om.ingress" />
                    </Ingress>
                </Block>
                <Block margin="xxl">
                    <Ingress>
                        <FormattedMessage id="planInfo.ingress.del2" />
                    </Ingress>
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
                    <StepButtonWrapper>
                        <StepButtonsHookForm
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            nextButtonOnClick={() => navigate(PlanleggerRoutes.PLAN)}
                        />
                    </StepButtonWrapper>
                </Block>
            </Heading>
        </ContentWrapper>
    );
};

export default PlanInfoSteg;
