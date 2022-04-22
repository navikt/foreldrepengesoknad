import { Block, intlUtils, Step } from '@navikt/fp-common';
import actionCreator from 'app/context/action/actionCreator';
import SøknadRoutes from 'app/routes/routes';
import { Hovedknapp } from 'nav-frontend-knapper';
import React from 'react';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
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
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

const Søkersituasjon = () => {
    const intl = useIntl();
    const søknad = useSøknad();
    const søkerinfo = useSøkerinfo();
    const { kjønn } = søkerinfo.person;

    const onValidSubmitHandler = (values: Partial<SøkersituasjonFormData>) => {
        const søkersituasjon = mapSøkersituasjonFormDataToState(values);
        return [actionCreator.setSøkersituasjon(søkersituasjon)];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.OM_BARNET,
        (state: ForeldrepengesøknadContextState) => storeAppState(state)
    );
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    return (
        <SøkersituasjonFormComponents.FormikWrapper
            initialValues={getInitialSøkerSituasjonValues(søknad.søkersituasjon)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues }) => {
                const visibility = søkersituasjonQuestionsConfig.getVisbility({
                    ...formValues,
                    søkerKjønn: kjønn,
                });
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="søkersituasjon"
                        pageTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        stepTitle={intlUtils(intl, 'søknad.søkersituasjon')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                        kompakt={true}
                        infoMessage={
                            <AlertStripe type="info">
                                <Normaltekst>
                                    22. april: Vi opplever noen ustabiliteter i søknaden for tiden. Dersom du opplever
                                    problemer forsøke igjen senere. Får du fortsatt problemer kan du ta kontakt med oss
                                    på mandag.
                                </Normaltekst>
                            </AlertStripe>
                        }
                    >
                        <SøkersituasjonFormComponents.Form includeButtons={false}>
                            <div>
                                <Block>
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
                                <Block visible={visibility.isVisible(SøkersituasjonFormField.rolle)}>
                                    <VelgRolle kjønn={kjønn} />
                                </Block>
                                {allQuestionsAnswered && (
                                    <Block textAlignCenter={true} margin="l">
                                        <Hovedknapp disabled={isSubmitting} spinner={isSubmitting}>
                                            {intlUtils(intl, 'søknad.gåVidere')}
                                        </Hovedknapp>
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
