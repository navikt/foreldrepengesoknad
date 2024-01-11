import { FormattedMessage } from 'react-intl';
import { Block } from '@navikt/fp-common';
import { ContentWrapper } from '@navikt/fp-ui';
import { BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react';
import useEsNavigator from 'appData/usePlanleggerNavigator';
import { useForm } from 'react-hook-form';
import { PlanleggerDataType, usePlanleggerStateSaveFn } from 'appData/PlanleggerDataContext';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Path } from 'appData/paths';
import Kalender from 'components/ikoner/Kalender';
import HvorforSpørViOmDette from 'components/expansion-card/HvorforSpørViOmDette';

const OmBarnetSteg: React.FunctionComponent = () => {
    const navigator = useEsNavigator();
    const formMethods = useForm();

    const lagreBarnehageplass = usePlanleggerStateSaveFn(PlanleggerDataType.BARNEHAGEPLASS);
    const lagre = (formValues: any) => {
        lagreBarnehageplass(formValues);
        navigator.goToNextStep(Path.ARBEIDSSITUASJON);
    };

    console.log('formMethods', formMethods);

    return (
        <ContentWrapper>
            <Form formMethods={formMethods} onSubmit={lagre}>
                <Heading size="large">
                    <FormattedMessage id="barnehageplass.tittel" />
                </Heading>
                <Block margin="xl" className="border">
                    <Heading size="small">
                        <FormattedMessage id="barnehageplass.datoTittel" />
                    </Heading>

                    <div className="mt-10 with-icon">
                        <Kalender />
                        <FormattedMessage id="barnehageplass.dato" />
                    </div>
                    <div className="mt-10">
                        <BodyLong>
                            <FormattedMessage id="barnehageplass.datoTekst" />
                        </BodyLong>
                    </div>
                </Block>
                <Block margin="xl" className="panel grey">
                    <Heading size="small">
                        <FormattedMessage id="barnehageplass.barnehageTittel" />
                    </Heading>
                    <Block margin="l">
                        <FormattedMessage id="barnehageplass.barnehageTekst" />
                    </Block>
                </Block>

                <Block margin="xl" className="panel grey">
                    <Heading size="small">
                        <FormattedMessage id="barnehageplass.kommuneTittel" />
                    </Heading>
                    <Block margin="l">
                        <FormattedMessage id="barnehageplass.kommuneTekst" />
                    </Block>
                </Block>

                <Block margin="xl" className="panel grey">
                    <Heading size="small">
                        <FormattedMessage id="barnehageplass.alleredeTittel" />
                    </Heading>
                    <Block margin="l">
                        <FormattedMessage id="barnehageplass.alleredeTekst" />
                    </Block>
                    <Block margin="l">
                        <Button variant="secondary">
                            <FormattedMessage id="barnehageplass.knapp" />
                        </Button>
                    </Block>
                </Block>

                <HvorforSpørViOmDette />

                <Block margin="xxl" className="button-wrapper content-wrapper">
                    <StepButtonsHookForm
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        nextButtonText="Neste"
                        previousButtonText="Tilbake"
                    />
                </Block>
            </Form>
        </ContentWrapper>
    );
};

export default OmBarnetSteg;
