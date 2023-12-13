import { ClockIcon } from '@navikt/aksel-icons';
import { BodyShort, Heading, Ingress } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { ContentWrapper } from '@navikt/fp-ui';
import Kalender from 'components/ikoner/Kalender';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import PlanleggerKnapp from 'components/planlegger-knapp/PlanleggerKnapp';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import PlanleggerRoutes from '../../routes/routes';

const OmPlanleggerenSteg = () => {
    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <Heading size="large">
                <Block>
                    <FormattedMessage id="om.tittel" />
                </Block>

                <Block margin="m">
                    <Heading size="xsmall">
                        <div className="list-item">
                            <ClockIcon />
                        </div>
                        <FormattedMessage id="om.label" />
                    </Heading>
                </Block>

                <Block margin="xxl">
                    <Ingress>
                        <FormattedMessage id="om.ingress" />
                    </Ingress>
                </Block>

                <Block margin="xxl">
                    <Heading level="2" size="xsmall">
                        <FormattedMessage id="om.underoverskrift" />
                    </Heading>
                </Block>

                <Block margin="l">
                    <div className="list-content">
                        <div className="list-item">
                            <Spørsmålstegn />
                        </div>
                        <div className="list-item">
                            <BodyShort>
                                <FormattedMessage id="om.trinn1" />
                            </BodyShort>
                        </div>
                    </div>
                </Block>

                <Block margin="l">
                    <div className="list-content">
                        <div className="list-item">
                            <Kalender />
                        </div>
                        <div className="list-item">
                            <BodyShort>
                                <FormattedMessage id="om.trinn2" />
                            </BodyShort>
                        </div>
                    </div>
                </Block>

                <Block margin="xxl" className="center-media">
                    <PlanleggerKnapp onClick={() => navigate(PlanleggerRoutes.HVEM_PLANLEGGER)}>
                        <FormattedMessage id="om.start.planlegger" />
                    </PlanleggerKnapp>
                </Block>
            </Heading>
        </ContentWrapper>
    );
};

export default OmPlanleggerenSteg;
