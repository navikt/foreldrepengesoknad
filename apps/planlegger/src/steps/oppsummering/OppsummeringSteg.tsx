import { Button, ExpansionCard, Heading, Ingress } from '@navikt/ds-react';
import { Block, StepButtonWrapper } from '@navikt/fp-common';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import PlanleggerRoutes from './../../routes/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import Kalender from 'components/ikoner/Kalender';
import OppsummeringCheck from 'components/ikoner/OppsummeringCheck';

const Oppsummering = () => {
    const navigate = useNavigate();
    const navigator = usePlanleggerNavigator();

    return (
        <ContentWrapper>
            <Heading size="large">
                <Block padBottom="xl">
                    <div className="with-icon">
                        <OppsummeringCheck />
                        <FormattedMessage id="oppsummering.tittel" />
                    </div>
                </Block>

                <Block padBottom="xl">
                    <Ingress>
                        <FormattedMessage id="oppsummering.ingress" />
                    </Ingress>
                </Block>

                <Block padBottom="xl">
                    <ExpansionCard aria-label="">
                        <ExpansionCard.Header>
                            <div className="with-icon">
                                <Spørsmålstegn />
                                <ExpansionCard.Title size="medium">
                                    <FormattedMessage id="oppsummering.info.tittel" />
                                </ExpansionCard.Title>
                            </div>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <FormattedMessage id="oppsummering.info.tekst" />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                </Block>

                <Block padBottom="xxl">
                    <ExpansionCard aria-label="">
                        <ExpansionCard.Header>
                            <div className="with-icon">
                                <Kalender />

                                <ExpansionCard.Title size="medium">
                                    <FormattedMessage id="oppsummering.planInfo.tittel" />
                                </ExpansionCard.Title>
                            </div>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <FormattedMessage id="oppsummering.planInfo.tekst" />
                        </ExpansionCard.Content>
                    </ExpansionCard>
                </Block>

                <Block margin="xxl" padBottom="xxxl">
                    <StepButtonWrapper>
                        <Button variant="secondary">Eksporter kalender</Button>
                        <Button variant="secondary">Gjør endringer</Button>
                    </StepButtonWrapper>
                </Block>

                <Block margin="xxl" padBottom="xl">
                    <StepButtons
                        nextButtonText="Legg til i søknad"
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => navigate(PlanleggerRoutes.OM_PLANLEGGEREN)}
                        previousButtonText="Lagre i Mitt NAV"
                    ></StepButtons>
                </Block>
                <Block className="center">
                    <Button variant="tertiary" onClick={() => navigate(PlanleggerRoutes.OM_PLANLEGGEREN)}>
                        Avbryt
                    </Button>
                </Block>
            </Heading>
        </ContentWrapper>
    );
};

export default Oppsummering;
