import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Dokumentasjon } from 'types/Dokumentasjon';
import { erAdopsjon, harBarnetTermindato } from 'types/OmBarnet';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Attachment } from '@navikt/fp-types';
import { ScanDocumentInfo, SkjemaRotLayout, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { AdopsjonDokPanel } from './AdopsjonDokPanel';
import { TerminDokPanel } from './TerminDokPanel';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

export const DokumentasjonSteg = ({ mellomlagreOgNaviger }: Props) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);
    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

    const dokumentasjon = useContextGetData(ContextDataType.DOKUMENTASJON);
    const oppdaterDokumentasjon = useContextSaveData(ContextDataType.DOKUMENTASJON);
    const omBarnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erBarnetAdoptert = erAdopsjon(omBarnet);
    const harTermindato = harBarnetTermindato(omBarnet);

    const formMethods = useForm<Dokumentasjon>({
        defaultValues: dokumentasjon,
    });

    const lagre = (formValues: Dokumentasjon) => {
        if (formValues.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: erBarnetAdoptert
                    ? intl.formatMessage({ id: 'DokumentasjonSteg.MinstEttDokumentAdopsjon' })
                    : intl.formatMessage({ id: 'DokumentasjonSteg.MinstEttDokumentTermin' }),
            });
            return Promise.resolve();
        } else {
            oppdaterDokumentasjon(formValues);
            return navigator.goToNextDefaultStep();
        }
    };

    const updateAttachments = (attachments: Attachment[], hasPendingUploads: boolean) => {
        console.log(attachments);
        setAvventerVedlegg(hasPendingUploads);
        formMethods.setValue('vedlegg', attachments, { shouldDirty: true, shouldTouch: true });
        formMethods.clearErrors('vedlegg');
    };

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}>
            <Step onStepChange={navigator.goToNextStep} steps={stepConfig} noFieldsRequired>
                <RhfForm formMethods={formMethods} onSubmit={lagre}>
                    <VStack gap="space-40">
                        <ErrorSummaryHookForm />
                        {erBarnetAdoptert && (
                            <AdopsjonDokPanel
                                attachments={dokumentasjon?.vedlegg}
                                updateAttachments={updateAttachments}
                            />
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
                            onAvsluttOgSlett={navigator.avbrytSøknad}
                            onFortsettSenere={navigator.fortsettSøknadSenere}
                            goToPreviousStep={navigator.goToPreviousDefaultStep}
                            saveDataOnPreviousClick={oppdaterDokumentasjon}
                            isDisabledAndLoading={avventerVedlegg}
                        />
                    </VStack>
                </RhfForm>
            </Step>
        </SkjemaRotLayout>
    );
};
