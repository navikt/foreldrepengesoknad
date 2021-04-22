import { bemUtils, Block, commonFieldErrorRenderer, intlUtils, Kjønn, Step } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { onAvbrytSøknad } from 'app/util/globalUtil';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import stepConfig from '../config/stepsConfig';
import VelgRolle from './components/VelgRolle';
import {
    initialSøkersituasjonValues,
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
    const bem = bemUtils('søkersituasjon');
    const history = useHistory();
    const { dispatch } = useForeldrepengesøknadContext();

    const onValidSubmit = (values: Partial<SøkersituasjonFormData>) => {
        dispatch(actionCreator.setSøkersituasjon(mapSøkersituasjonFormDataToState(values)));
        history.push('/soknad/om-barnet');
    };

    return (
        <SøkersituasjonFormComponents.FormikWrapper
            initialValues={initialSøkersituasjonValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = søkersituasjonQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="søkersituasjon"
                        pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        onCancel={() => onAvbrytSøknad(dispatch, history)}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <SøkersituasjonFormComponents.Form
                            includeButtons={false}
                            fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        >
                            <div className={bem.block}>
                                <Block margin="xl">
                                    <SøkersituasjonFormComponents.RadioPanelGroup
                                        name={SøkersituasjonFormField.situasjon}
                                        radios={[
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radioButton.adopsjon'),
                                                value: 'adopsjon',
                                            },
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radioButton.fødsel'),
                                                value: 'fødsel',
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
