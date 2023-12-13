import { BodyLong, BodyShort, Heading, Ingress } from '@navikt/ds-react';
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
            <Heading size="large">
                <Block padBottom="xl">
                    <FormattedMessage id="oversikt.tittel" />
                </Block>

                <Block padBottom="xl">
                    <Ingress>
                        <FormattedMessage id="oversikt.ingress" />
                    </Ingress>
                </Block>

                <Block padBottom="xxl" className="border">
                    <Heading size="small">
                        <FormattedMessage id="oversikt.valgtTittel" />
                    </Heading>

                    <div className="mt-10 with-icon">
                        <BodyLong>
                            <FormattedMessage id="oversikt.valgtTekst" />
                        </BodyLong>
                        <Button icon={<PencilIcon aria-hidden />} className="icon-right" />
                    </div>
                </Block>

                <Block padBottom="l">
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

                <Block margin="xl" padBottom="xxl">
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.2024" />
                    </Heading>
                    <div className="border">
                        <BodyShort>Kalenderoversikt</BodyShort>
                    </div>
                </Block>

                <Block margin="xl" padBottom="xxl">
                    <Heading size="small" spacing>
                        <FormattedMessage id="oversikt.2025" />
                    </Heading>
                    <div className="border">
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
            </Heading>
        </ContentWrapper>
    );
};

export default OversiktSteg;
