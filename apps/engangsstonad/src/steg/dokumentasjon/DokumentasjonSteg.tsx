import { VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { Step } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';
import { ScanDocumentInfo, useCustomIntl } from '@navikt/fp-ui';
import { Form, StepButtonsHookForm, ErrorSummaryHookForm } from '@navikt/fp-form-hooks';

import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import Dokumentasjon from 'types/Dokumentasjon';
import { erAdopsjon, erBarnetIkkeFødt } from 'types/OmBarnet';
import AdopsjonDokPanel from './AdopsjonDokPanel';
import TerminDokPanel from './TerminDokPanel';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const DokumentasjonSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const { i18n } = useCustomIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);

    const dokumentasjon = useContextGetData(ContextDataType.DOKUMENTASJON);
    const oppdaterDokumentasjon = useContextSaveData(ContextDataType.DOKUMENTASJON);
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erBarnetAdoptert = erAdopsjon(omBarnet);
    const harTermindato = erBarnetIkkeFødt(omBarnet);

    const formMethods = useForm<Dokumentasjon>({
        defaultValues: dokumentasjon,
    });

    const lagre = (formValues: Dokumentasjon) => {
        if (formValues.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: erBarnetAdoptert
                    ? i18n('DokumentasjonSteg.MinstEttDokumentAdopsjon')
                    : i18n('DokumentasjonSteg.MinstEttDokumentTermin'),
            });
            return Promise.resolve();
        } else {
            oppdaterDokumentasjon(formValues);
            return navigator.goToNextDefaultStep();
        }
    };

    const updateAttachments = (attachments: Attachment[]) => {
        formMethods.setValue('vedlegg', attachments);
        formMethods.clearErrors('vedlegg');
    };

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            onCancel={navigator.avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {erBarnetAdoptert && (
                        <AdopsjonDokPanel attachments={dokumentasjon?.vedlegg} updateAttachments={updateAttachments} />
                    )}
                    {harTermindato && (
                        <TerminDokPanel
                            attachments={dokumentasjon?.vedlegg}
                            updateAttachments={updateAttachments}
                            omBarnet={omBarnet}
                        />
                    )}
                    <ScanDocumentInfo />
                    <StepButtonsHookForm<Dokumentasjon>
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        saveDataOnPreviousClick={oppdaterDokumentasjon}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default DokumentasjonSteg;
