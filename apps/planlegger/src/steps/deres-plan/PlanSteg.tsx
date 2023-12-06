import { BodyLong, Heading, Ingress } from '@navikt/ds-react';
import { Block, StepButtonWrapper } from '@navikt/fp-common';
import { ContentWrapper } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import PlanleggerRoutes from '../../routes/routes';
import { StepButtonsHookForm } from '@navikt/fp-form-hooks';
import useEsNavigator from 'appData/useEsNavigator';

const PlanSteg = () => {
    const navigate = useNavigate();
    const navigator = useEsNavigator();

    return (
        <ContentWrapper>
            <Heading size="large">
                <Block>
                    <FormattedMessage id="plan.tittel" />
                </Block>

                <Block margin="xxl">
                    <Ingress>
                        <FormattedMessage id="plan.ingress" />
                    </Ingress>
                </Block>

                <Block margin="xl" className="border">
                    <Heading size="small">
                        <FormattedMessage id="plan.valgtTittel" />
                    </Heading>

                    <div className="mt-10">
                        <BodyLong>
                            <FormattedMessage id="plan.varlgtTekst" />
                        </BodyLong>
                    </div>
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

export default PlanSteg;
