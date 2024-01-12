import { BodyLong, Button, ExpansionCard, Heading } from '@navikt/ds-react';
import { Block, StepButtonWrapper } from '@navikt/fp-common';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Spørsmålstegn from 'components/ikoner/Spørsmålstegn';
import Kalender from 'components/ikoner/Kalender';
import OppsummeringCheck from 'components/ikoner/OppsummeringCheck';
import { PlanleggerRoutes } from 'appData/routes';

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
                    <BodyLong size="large">
                        <FormattedMessage id="oppsummering.ingress" />
                    </BodyLong>
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
                        <Button variant="secondary" type="button">
                            Eksporter kalender
                        </Button>
                        <Button variant="secondary" type="button">
                            Gjør endringer
                        </Button>
                    </StepButtonWrapper>
                </Block>

                <Block margin="xxl" padBottom="xl">
                    <StepButtons
                        nextButtonText="Legg til i søknad"
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => navigate(PlanleggerRoutes.OM_PLANLEGGEREN)}
                        previousButtonText="Tilbake"
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
