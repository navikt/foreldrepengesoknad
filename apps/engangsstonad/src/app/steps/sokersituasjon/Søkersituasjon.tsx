import { bemUtils, Block, intlUtils, Step } from '@navikt/fp-common';
import stepConfig from 'app/step-config/stepConfig';
import getMessage from 'common/util/i18nUtils';
import React from 'react';
import { Button } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import actionCreator from 'app/context/action/actionCreator';
import {
    SøkersituasjonFormComponents,
    SøkersituasjonFormData,
    SøkersituasjonFormField,
} from './søkersituasjonFormConfig';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';

import { cleanupSøkersituasjon } from './søkersituasjonUtils';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik-ds/lib';
import søkersituasjonQuestionsConfig from './søkersituasjonQuestionsConfig';
import { useNavigate } from 'react-router';
import { onAvbrytSøknad } from 'app/util/globalUtil';

const Søkersituasjon: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('søkersituasjon');
    const navigate = useNavigate();
    const { state, dispatch } = useEngangsstønadContext();
    const søkersituasjonValues = state.søknad.søkersituasjon;

    const onValidSubmit = (values: Partial<SøkersituasjonFormData>) => {
        dispatch(
            actionCreator.setSøkersituasjon({
                situasjon: values.situasjon,
            })
        );
        navigate('/soknad/om-barnet');
    };

    return (
        <SøkersituasjonFormComponents.FormikWrapper
            initialValues={søkersituasjonValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = søkersituasjonQuestionsConfig.getVisbility(formValues);
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={getMessage(intl, 'søknad.pageheading')}
                        activeStepId="søkersituasjon"
                        pageTitle={getMessage(intl, 'søknad.søkersituasjon')}
                        stepTitle={getMessage(intl, 'søknad.søkersituasjon')}
                        onCancel={() => onAvbrytSøknad(dispatch, navigate)}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <SøkersituasjonFormComponents.Form
                            includeButtons={false}
                            cleanup={() => cleanupSøkersituasjon(formValues)}
                            noButtonsContentRenderer={
                                allQuestionsAnswered
                                    ? undefined
                                    : () => (
                                          <UnansweredQuestionsInfo>
                                              {intlUtils(intl, 'søknad.footer.spørsmålMåBesvares')}
                                          </UnansweredQuestionsInfo>
                                      )
                            }
                        >
                            <div className={bem.block}>
                                <Block margin="xl">
                                    <SøkersituasjonFormComponents.RadioGroup
                                        name={SøkersituasjonFormField.situasjon}
                                        radios={[
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radiobutton.adopsjon'),
                                                value: 'adopsjon',
                                            },
                                            {
                                                label: intlUtils(intl, 'søkersituasjon.radiobutton.fødsel'),
                                                value: 'fødsel',
                                            },
                                        ]}
                                        legend={getMessage(intl, 'søkersituasjon.text.situasjon')}
                                    />
                                </Block>
                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Button variant="secondary">{getMessage(intl, 'søknad.gåVidere')}</Button>
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
