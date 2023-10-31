import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Kjønn, Step } from '@navikt/fp-common';
import { VStack } from '@navikt/ds-react';
import { useCustomIntl } from '@navikt/fp-ui';
import { StepButtonsHookForm, Form, ErrorSummaryHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';
import { omitOne } from '@navikt/fp-utils';

import { Søkersituasjon, SøkersituasjonEnum } from 'types/Søkersituasjon';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepData from 'appData/useStepData';
import { Path } from 'appData/paths';
import FødselPanel, { FormValues as FødtFormValues } from './FødselPanel';
import AdopsjonPanel, { FormValues as AdopsjonFormValues } from './AdopsjonPanel';

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
    const { i18n } = useCustomIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const omBarnet = useEsStateData(EsDataType.OM_BARNET);
    const lagreOmBarnet = useEsStateSaveFn(EsDataType.OM_BARNET);
    const lagreDokumentasjon = useEsStateSaveFn(EsDataType.DOKUMENTASJON);
    const søkersituasjon = notEmpty(useEsStateData(EsDataType.SØKERSITUASJON));

    const lagre = useCallback((formValues: FormValues) => {
        const { antallBarnDropDown, antallBarn } = formValues;
        lagreOmBarnet({
            ...omitOne(formValues, 'antallBarnDropDown'),
            antallBarn:
                antallBarn > 2 && antallBarnDropDown ? Number.parseInt(antallBarnDropDown, 10) : formValues.antallBarn,
        });
        if (formValues.erBarnetFødt === true) {
            lagreDokumentasjon(undefined);
        }
        navigator.goToNextStep(utledNesteSteg(formValues, søkersituasjon));
    }, []);

    const formMethods = useForm<FormValues>({
        defaultValues: omBarnet
            ? {
                  ...omBarnet,
                  antallBarn: omBarnet.antallBarn > 2 ? 3 : omBarnet.antallBarn,
                  antallBarnDropDown: omBarnet.antallBarn > 2 ? omBarnet.antallBarn.toString() : undefined,
              }
            : {},
    });

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            pageTitle={i18n('OmBarnetSteg.OmBarnet')}
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