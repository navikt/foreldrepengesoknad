import { bemUtils, Block, intlUtils, Step, useDocumentTitle } from '@navikt/fp-common';
import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from '@navikt/ds-react';
import {
    OmBarnetFormComponents,
    OmBarnetFormField,
    OmBarnetFormData,
    initialOmBarnetValues,
} from './omBarnetFormConfig';
import omBarnetQuestionsConfig from './omBarnetQuestionsConfig';
import getMessage from 'common/util/i18nUtils';
import { useNavigate } from 'react-router-dom';
import { UnansweredQuestionsInfo, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import actionCreator from 'app/context/action/actionCreator';
import stepConfig, { getPreviousStepHref } from 'app/step-config/stepConfig';
import { cleanupOmBarnet } from './omBarnetUtils';
import { useEngangsstønadContext } from 'app/context/hooks/useEngangsstønadContext';
import Født from './situasjon/Født';
import Termin from './situasjon/Termin';

import { onAvbrytSøknad } from 'app/util/globalUtil';
import { logAmplitudeEvent } from 'app/amplitude/amplitude';
import { PageKeys } from 'app/types/PageKeys';
import Adopsjon from './situasjon/Adopsjon';
import Person from 'app/types/domain/Person';

import './omBarnet.less';

interface Props {
    person: Person;
}

const shouldResetInitialValues = (
    situasjon: string,
    erBarnetFødt: YesOrNo,
    adopsjonAvEktefellesBarn: YesOrNo
): boolean => {
    if (
        (situasjon === 'adopsjon' && erBarnetFødt !== YesOrNo.UNANSWERED) ||
        (situasjon === 'fødsel' && adopsjonAvEktefellesBarn !== YesOrNo.UNANSWERED)
    ) {
        return true;
    }

    return false;
};

const OmBarnet: React.FunctionComponent<Props> = ({ person }) => {
    const intl = useIntl();
    const bem = bemUtils('omBarnet');
    const navigate = useNavigate();
    useDocumentTitle(intlUtils(intl, 'søknad.omBarnet'));
    const { state, dispatch } = useEngangsstønadContext();
    const søkersituasjonValues = state.søknad.søkersituasjon;
    const { omBarnet } = state.søknad;
    const { situasjon } = søkersituasjonValues;
    const initialValues = shouldResetInitialValues(situasjon!, omBarnet.erBarnetFødt, omBarnet.adopsjonAvEktefellesBarn)
        ? initialOmBarnetValues
        : omBarnet;

    logAmplitudeEvent('sidevisning', {
        app: 'engangsstonadny',
        team: 'foreldrepenger',
        pageKey: PageKeys.OmBarnet,
    });

    const onValidSubmit = (values: Partial<OmBarnetFormData>) => {
        dispatch(
            actionCreator.setOmBarnet({
                erBarnetFødt: values.erBarnetFødt!,
                adopsjonAvEktefellesBarn: values.adopsjonAvEktefellesBarn!,
                antallBarn: values.antallBarn,
                adopsjonsdato: values.adopsjonsdato,
                søkerAdopsjonAlene: values.søkerAdopsjonAlene!,
                fødselsdatoer: values.fødselsdatoer || [],
                termindato: values.termindato,
                terminbekreftelse: values.terminbekreftelse || [],
                omsorgsovertakelse: values.omsorgsovertakelse || [],
                terminbekreftelsedato: values.terminbekreftelsedato,
            })
        );
        navigate('/soknad/utenlandsopphold');
    };

    return (
        <OmBarnetFormComponents.FormikWrapper
            initialValues={initialValues}
            onSubmit={(values) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                // @ts-ignore Fiks denne
                const visibility = omBarnetQuestionsConfig.getVisbility({
                    ...formValues,
                    situasjon: søkersituasjonValues.situasjon!,
                    kjønn: person.kjønn,
                });
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <Step
                        bannerTitle={getMessage(intl, 'søknad.pageheading')}
                        activeStepId="omBarnet"
                        pageTitle={getMessage(intl, 'søknad.omBarnet')}
                        stepTitle={getMessage(intl, 'søknad.omBarnet')}
                        backLinkHref={getPreviousStepHref('omBarnet')}
                        onCancel={() => onAvbrytSøknad(dispatch, navigate)}
                        steps={stepConfig}
                        kompakt={true}
                    >
                        <OmBarnetFormComponents.Form
                            includeButtons={false}
                            // @ts-ignore Fiks denne
                            cleanup={() => cleanupOmBarnet(formValues)}
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
                                {søkersituasjonValues.situasjon === 'adopsjon' ? (
                                    <Block>
                                        <OmBarnetFormComponents.YesOrNoQuestion
                                            name={OmBarnetFormField.adopsjonAvEktefellesBarn}
                                            legend={getMessage(intl, 'omBarnet.adopsjon.spørsmål.stebarnsadopsjon')}
                                            labels={{
                                                no: getMessage(intl, 'omBarnet.adopsjon.text.nei'),
                                                yes: getMessage(intl, 'omBarnet.adopsjon.text.ja'),
                                            }}
                                        />
                                    </Block>
                                ) : (
                                    <Block>
                                        <OmBarnetFormComponents.YesOrNoQuestion
                                            name={OmBarnetFormField.erBarnetFødt}
                                            legend={getMessage(intl, 'omBarnet.spørsmål.nårErBarnetFødt')}
                                            labels={{
                                                no: getMessage(intl, 'omBarnet.radiobutton.fremtid'),
                                                yes: getMessage(intl, 'omBarnet.radiobutton.fortid'),
                                            }}
                                        />
                                    </Block>
                                )}
                                <Adopsjon
                                    visibility={visibility}
                                    // @ts-ignore Fiks denne
                                    formValues={formValues}
                                    kjønn={person.kjønn}
                                />
                                <Født
                                    visibility={visibility}
                                    // @ts-ignore Fiks denne
                                    formValues={formValues}
                                />
                                <Termin
                                    visibility={visibility}
                                    // @ts-ignore Fiks denne
                                    formValues={formValues} 
                                />

                                {allQuestionsAnswered && (
                                    <Block margin="xl" textAlignCenter={true}>
                                        <Button variant="secondary">{getMessage(intl, 'søknad.gåVidere')}</Button>
                                    </Block>
                                )}
                            </div>
                        </OmBarnetFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default OmBarnet;
