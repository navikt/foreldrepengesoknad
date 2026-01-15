import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { Path } from 'appData/paths';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { OmBarnet } from 'types/OmBarnet';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Kjønn_fpoversikt, Søkersituasjon } from '@navikt/fp-types';
import { SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { omitOne } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { FormValues as AdopsjonFormValues, AdopsjonPanel } from './AdopsjonPanel';
import { FødselPanel, FormValues as FødtFormValues } from './FødselPanel';

type FormValues = FødtFormValues & AdopsjonFormValues;

const utledNesteSteg = (formValues: FormValues, søkersituasjon: Søkersituasjon) => {
    if (søkersituasjon.situasjon === 'adopsjon') {
        return Path.ADOPSJONSBEKREFTELSE;
    }
    if (!formValues.erBarnetFødt && formValues.termindato !== undefined) {
        return Path.TERMINBEKREFTELSE;
    }
    return Path.UTENLANDSOPPHOLD;
};

const mapOmBarnetFraFormTilState = (formValues: FormValues) => ({
    ...omitOne(formValues, 'antallBarnDropDown'),
    antallBarn:
        formValues.antallBarn > 2 && formValues.antallBarnDropDown
            ? Number.parseInt(formValues.antallBarnDropDown, 10)
            : formValues.antallBarn,
});

const mapOmBarnetFraStateTilForm = (omBarnet: OmBarnet) => ({
    ...omBarnet,
    antallBarn: omBarnet.antallBarn > 2 ? 3 : omBarnet.antallBarn,
    antallBarnDropDown: omBarnet.antallBarn > 2 ? omBarnet.antallBarn.toString() : undefined,
});

interface Props {
    kjønn: Kjønn_fpoversikt;
    mellomlagreOgNaviger: () => Promise<void>;
}

export const OmBarnetSteg = ({ kjønn, mellomlagreOgNaviger }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);
    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);
    const oppdaterDokumentasjon = useContextSaveData(ContextDataType.DOKUMENTASJON);
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));

    const mapOgLagreOmBarnet = (formValues: FormValues) => oppdaterOmBarnet(mapOmBarnetFraFormTilState(formValues));

    const onSubmit = (formValues: FormValues) => {
        mapOgLagreOmBarnet(formValues);
        if (formValues.erBarnetFødt === true) {
            oppdaterDokumentasjon(undefined);
        }
        return navigator.goToNextStep(utledNesteSteg(formValues, søkersituasjon));
    };

    const formMethods = useForm<FormValues>({
        defaultValues: omBarnet ? mapOmBarnetFraStateTilForm(omBarnet) : {},
    });

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}>
            <Step onStepChange={navigator.goToNextStep} steps={stepConfig}>
                <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        {søkersituasjon?.situasjon === 'adopsjon' && <AdopsjonPanel kjønn={kjønn} />}
                        {søkersituasjon?.situasjon === 'fødsel' && <FødselPanel />}
                        <StepButtonsHookForm<FormValues>
                            onAvsluttOgSlett={navigator.avbrytSøknad}
                            onFortsettSenere={navigator.fortsettSøknadSenere}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            saveDataOnPreviousClick={mapOgLagreOmBarnet}
                        />
                    </VStack>
                </RhfForm>
            </Step>
        </SkjemaRotLayout>
    );
};
