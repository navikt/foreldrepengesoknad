import { useForm } from 'react-hook-form';
import { Kjønn, Step } from '@navikt/fp-common';
import { VStack } from '@navikt/ds-react';
import { useCustomIntl } from '@navikt/fp-ui';
import { StepButtonsHookForm, Form, ErrorSummaryHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';
import { omitOne } from '@navikt/fp-utils';

import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { Path } from 'appData/paths';
import { OmBarnet } from 'types/OmBarnet';
import FødselPanel, { FormValues as FødtFormValues } from './FødselPanel';
import AdopsjonPanel, { FormValues as AdopsjonFormValues } from './AdopsjonPanel';
import { Søkersituasjon } from '@navikt/fp-types';

type FormValues = FødtFormValues & AdopsjonFormValues;

const utledNesteSteg = (formValues: FormValues, søkersituasjon: Søkersituasjon) => {
    if (søkersituasjon.situasjon === 'adopsjon') {
        return Path.ADOPSJONSBEKREFTELSE;
    }
    if (formValues.erBarnetFødt === false) {
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

export interface Props {
    kjønn: Kjønn;
    mellomlagreOgNaviger: () => void;
}

const OmBarnetSteg: React.FunctionComponent<Props> = ({ kjønn, mellomlagreOgNaviger }) => {
    const { i18n } = useCustomIntl();

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
        navigator.goToNextStep(utledNesteSteg(formValues, søkersituasjon));
    };

    const formMethods = useForm<FormValues>({
        defaultValues: omBarnet ? mapOmBarnetFraStateTilForm(omBarnet) : {},
    });

    return (
        <Step bannerTitle={i18n('Søknad.Pageheading')} onCancel={navigator.avbrytSøknad} steps={stepConfig}>
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {søkersituasjon?.situasjon === 'adopsjon' && <AdopsjonPanel kjønn={kjønn} />}
                    {søkersituasjon?.situasjon === 'fødsel' && <FødselPanel />}
                    <StepButtonsHookForm<FormValues>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={mapOgLagreOmBarnet}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default OmBarnetSteg;
