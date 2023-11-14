import { useCallback } from 'react';
import { VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { Step } from '@navikt/fp-common';
import { Attachment } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';
import { ScanDocumentInfo, useCustomIntl } from '@navikt/fp-ui';
import { Form, StepButtonsHookForm, ErrorSummaryHookForm } from '@navikt/fp-form-hooks';

import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import Dokumentasjon from 'types/Dokumentasjon';
import { erAdopsjon, erBarnetIkkeFødt } from 'types/OmBarnet';
import AdopsjonDokPanel from './AdopsjonDokPanel';
import TerminDokPanel from './TerminDokPanel';

const DokumentasjonSteg: React.FunctionComponent = () => {
    const { i18n } = useCustomIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator();

    const dokumentasjon = useEsStateData(EsDataType.DOKUMENTASJON);
    const lagreDokumentasjon = useEsStateSaveFn(EsDataType.DOKUMENTASJON);
    const omBarnet = notEmpty(useEsStateData(EsDataType.OM_BARNET));

    const erBarnetAdoptert = erAdopsjon(omBarnet);
    const harTermindato = erBarnetIkkeFødt(omBarnet);

    const formMethods = useForm<Dokumentasjon>({
        defaultValues: dokumentasjon,
    });

    const lagre = useCallback(
        (formValues: Dokumentasjon) => {
            if (formValues.vedlegg.length === 0) {
                formMethods.setError('vedlegg', {
                    message: erBarnetAdoptert
                        ? i18n('DokumentasjonSteg.MinstEttDokumentAdopsjon')
                        : i18n('DokumentasjonSteg.MinstEttDokumentTermin'),
                });
            } else {
                lagreDokumentasjon(formValues);
                navigator.goToNextDefaultStep();
            }
        },
        [erBarnetAdoptert, formMethods, i18n, lagreDokumentasjon, navigator],
    );

    const updateAttachments = useCallback(
        (attachments: Attachment[]) => {
            formMethods.setValue('vedlegg', attachments);
            formMethods.clearErrors('vedlegg');
        },
        [formMethods],
    );

    return (
        <Step
            bannerTitle={i18n('Søknad.Pageheading')}
            onCancel={navigator.avbrytSøknad}
            steps={stepConfig}
            useNoTempSavingText
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
                        saveDataOnPreviousClick={lagreDokumentasjon}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default DokumentasjonSteg;
