import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Kjønn, Step, useDocumentTitle } from '@navikt/fp-common';

import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import Form from 'fpcommon/form/Form';
import { Søkersituasjon, SøkersituasjonEnum } from 'types/Søkersituasjon';
import FødselPanel, { FormValues as FødtFormValues } from './FødselPanel';
import AdopsjonPanel, { FormValues as AdopsjonFormValues } from './AdopsjonPanel';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepData from 'appData/useStepData';

import './omBarnet.less';
import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import { Path } from 'appData/paths';
import { VStack } from '@navikt/ds-react';

type FormValues = FødtFormValues & AdopsjonFormValues;

const utledNesteSteg = (formValues: FormValues, søkersituasjon: Søkersituasjon) => {
    if (søkersituasjon.situasjon === SøkersituasjonEnum.ADOPSJON) {
        return Path.ADOPSJONSBEKREFTELSE;
    }
    if (formValues.erBarnetFødt === false) {
        return Path.TERMINBEKREFTELSE;
    }
    return Path.UTENLANDSOPPHOLD;
};

export interface Props {
    kjønn: Kjønn;
}

const OmBarnetSteg: React.FunctionComponent<Props> = ({ kjønn }) => {
    const intl = useIntl();

    useDocumentTitle(intl.formatMessage({ id: 'søknad.omBarnet' }));

    const stepData = useStepData();
    const navigator = useEsNavigator();
    const omBarnet = useEsStateData(EsDataType.OM_BARNET);
    const lagreOmBarnet = useEsStateSaveFn(EsDataType.OM_BARNET);
    const søkersituasjon = notEmpty(useEsStateData(EsDataType.SØKERSITUASJON));

    const lagre = useCallback((formValues: FormValues) => {
        lagreOmBarnet({
            ...formValues,
            antallBarn: formValues.antallBarnDropDown
                ? Number.parseInt(formValues.antallBarnDropDown, 10)
                : formValues.antallBarn,
        });
        navigator.goToNextStep(utledNesteSteg(formValues, søkersituasjon));
    }, []);

    const formMethods = useForm<FormValues>({
        defaultValues: omBarnet,
    });

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.omBarnet' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {søkersituasjon?.situasjon === SøkersituasjonEnum.ADOPSJON && <AdopsjonPanel kjønn={kjønn} />}
                    {søkersituasjon?.situasjon === SøkersituasjonEnum.FØDSEL && <FødselPanel />}
                    <StepButtonsHookForm<FormValues>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={lagreOmBarnet}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default OmBarnetSteg;
