import { Block, intlUtils, Kjønn, Step } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSetCurrentRoute from 'app/utils/hooks/useSetCurrentRoute';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { useIntl } from 'react-intl';
import stepConfig from '../stepsConfig';
import VelgRolle from './components/VelgRolle';
import {
    getInitialSøkerSituasjonValues,
    SøkersituasjonFormComponents,
    SøkersituasjonFormData,
    SøkersituasjonFormField,
} from './søkersituasjonFormConfig';
import søkersituasjonQuestionsConfig from './søkersituasjonQuestionsConfig';
import { mapSøkersituasjonFormDataToState } from './søkersituasjonUtils';

interface Props {
    kjønn: Kjønn;
}

const Søkersituasjon: React.FunctionComponent<Props> = ({ kjønn }) => {
    const intl = useIntl();
    const søknad = useSøknad();

    useSetCurrentRoute(SøknadRoutes.SØKERSITUASJON);

    const onValidSubmitHandler = (values: Partial<SøkersituasjonFormData>) => {
        const søkersituasjon = mapSøkersituasjonFormDataToState(values);
        return [actionCreator.setSøkersituasjon(søkersituasjon)];
    };

    const onValidSubmit = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.OM_BARNET);
    const onAvbrytSøknad = useAvbrytSøknad();

    return (
        <SøkersituasjonFormComponents.FormikWrapper
            initialValues={getInitialSøkerSituasjonValues(søknad.søkersituasjon)}
            onSubmit={onValidSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = søkersituasjonQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="søkersituasjon"
                        pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={() => null}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <SøkersituasjonFormComponents.Form includeButtons={false}>
                            <div>
                                <Block margin="xl">
                                    <SøkersituasjonFormComponents.RadioPanelGroup
                                        name={SøkersituasjonFormField.situasjon}
                                        radios={[
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radioButton.fødsel'),
                                                value: 'fødsel',
                                            },
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radioButton.adopsjon'),
                                                value: 'adopsjon',
                                            },
                                        ]}
                                        useTwoColumns={true}
                                        legend={intlUtils(intl, 'søkersituasjon.text.situasjon')}
                                    />
                                </Block>
                                <Block visible={visibility.isVisible(SøkersituasjonFormField.rolle)} margin="xl">
                                    <VelgRolle kjønn={kjønn} />
                                </Block>
                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Hovedknapp>{intlUtils(intl, 'søknad.gåVidere')}</Hovedknapp>
                                    </Block>
                                )}
                            </div>
                        </SøkersituasjonFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Søkersituasjon;
