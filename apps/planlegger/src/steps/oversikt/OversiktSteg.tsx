import { BodyLong, BodyShort, HStack, Heading, Ingress, VStack } from '@navikt/ds-react';
import { Block } from '@navikt/fp-common';
import { ContentWrapper, StepButtons } from '@navikt/fp-ui';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import PlanleggerRoutes from '../../routes/routes';
import usePlanleggerNavigator from 'appData/usePlanleggerNavigator';
import Hjerte from 'components/ikoner/Hjerte';
import RosaSirkel from 'components/ikoner/RosaSirkel';
import BlåSirkel from 'components/ikoner/BlåSirkel';
import { PencilIcon } from '@navikt/aksel-icons';
import { Button } from '@navikt/ds-react';

const OversiktSteg = () => {
    const navigate = useNavigate();
    const navigator = usePlanleggerNavigator();

    return (
        <ContentWrapper>
            <VStack gap="10">
                {/* TODO: Add a panel/box component */}
                <div className="panel green">
                    <Heading size="large" spacing>
                        <FormattedMessage id="oversikt.tittel" />
                    </Heading>

                    <Ingress>
                        <FormattedMessage id="oversikt.ingress" />
                    </Ingress>
                </div>
                <Block className="border">
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.valgtTittel" />
                    </Heading>

                    <HStack gap="20">
                        <BodyLong>
                            <FormattedMessage id="oversikt.valgtTekst" />
                        </BodyLong>
                        <Button icon={<PencilIcon aria-hidden />} className="icon-right" />
                    </HStack>
                </Block>
                <Block>
                    <div className="list-content">
                        <div className="list-item-oversikt with-icon">
                            <BlåSirkel />
                            <BodyShort>
                                <FormattedMessage id="ukerForeldrepengerIkontekst" />
                            </BodyShort>
                        </div>
                        <div className="list-item with-icon">
                            <Hjerte />
                            <BodyShort>
                                <FormattedMessage id="termindatoIkontekst" />
                            </BodyShort>
                        </div>
                    </div>

                    <div className="list-content">
                        <div className="list-item-oversikt with-icon">
                            <RosaSirkel />
                            <BodyShort>
                                <FormattedMessage id="barnehagestartIkontekst" />
                            </BodyShort>
                        </div>
                    </div>
                </Block>
                <Block>
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.2024" />
                    </Heading>
                    {/* TODO: Add a panel/box component*/}
                    <div className="panel green">
                        <BodyShort>Kalenderoversikt</BodyShort>
                    </div>
                </Block>
                <Block>
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.2025" />
                    </Heading>
                    {/* TODO: Add a panel/box component*/}
                    <div className="panel green">
                        <BodyShort>Kalenderoversikt</BodyShort>
                    </div>
                </Block>
                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtons
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonOnClick={() => navigate(PlanleggerRoutes.OPPSUMMERING)}
                        nextButtonText="Tilpass plan"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </VStack>
        </ContentWrapper>
    );
};

export default OversiktSteg;
