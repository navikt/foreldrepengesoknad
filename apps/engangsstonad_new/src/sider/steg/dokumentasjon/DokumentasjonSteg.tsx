import { useCallback } from 'react';
import { BodyLong, ExpansionCard, Label, VStack } from '@navikt/ds-react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { PictureScanningGuide, Step } from '@navikt/fp-common';

import ErrorSummaryHookForm from 'fpcommon/form/ErrorSummaryHookForm';
import Form from 'fpcommon/form/Form';
import StepButtonsHookForm from 'fpcommon/form/StepButtonsHookForm';
import useEsNavigator from 'appData/useEsNavigator';
import useStepData from 'appData/useStepData';
import { EsDataType, useEsStateData, useEsStateSaveFn } from 'appData/EsDataContext';
import Dokumentasjon from 'types/Dokumentasjon';
import Datepicker from 'fpcommon/form/Datepicker';
import FileUploader from 'fpcommon/uploader/FileUploader';
import Environment from 'appData/Environment';
import { Attachment, AttachmentType, Skjemanummer } from 'fpcommon/uploader/typer/Attachment';
import { isAttachmentWithError } from 'fpcommon/uploader/fileUtils';
import ErrorMessageHookForm from 'fpcommon/form/ErrorMessageHookForm';

const validerVedlegg = (vedlegg: Attachment[]): string | undefined => {
    const feilmeldinger = [] as string[];
    vedlegg.filter(isAttachmentWithError).forEach((error) => {
        if (error.filesize === 0) {
            feilmeldinger.push('vedlegg.tomFil');
        }
    });
    return feilmeldinger.length > 0 ? feilmeldinger[0] : undefined;
};

const DokumentasjonSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const dokumentasjon = useEsStateData(EsDataType.DOKUMENTASJON);
    const lagreDokumentasjon = useEsStateSaveFn(EsDataType.DOKUMENTASJON);

    const formMethods = useForm<Dokumentasjon>({
        defaultValues: dokumentasjon,
    });

    const lagre = useCallback((formValues: Dokumentasjon) => {
        const vedleggFeilmelding = validerVedlegg(formValues.vedlegg);
        if (vedleggFeilmelding) {
            formMethods.setError('vedlegg', {
                message: vedleggFeilmelding,
            });
        } else {
            lagreDokumentasjon(formValues);
            navigator.goToNextDefaultStep();
        }
    }, []);

    const updateAttachments = useCallback((attachments: Attachment[]) => {
        // TODO Må truleg kalle validering her òg
        //TODO Ikkje kall denne om det er feil på vedlegg
        formMethods.setValue('vedlegg', attachments);
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={intl.formatMessage({ id: 'søknad.søkersituasjon' })}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
            useNoTempSavingText
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    <VStack gap="4">
                        <div>
                            <Label>
                                <FormattedMessage id="vedlegg.adopsjon" />
                            </Label>
                            <BodyLong>
                                <FormattedMessage id="omBarnet.adopsjon.veilederpanel.adopsjon.text" />
                            </BodyLong>
                        </div>
                        <FileUploader
                            attachmentType={AttachmentType.TERMINBEKREFTELSE}
                            skjemanummber={Skjemanummer.TERMINBEKREFTELSE}
                            existingAttachments={dokumentasjon?.vedlegg}
                            updateAttachments={updateAttachments}
                            restApiUrl={Environment.REST_API_URL}
                        />
                        <ErrorMessageHookForm name="vedlegg" />
                    </VStack>
                    <Datepicker
                        name={`terminbekreftelse`}
                        label={<FormattedMessage id="utenlandsopphold.leggTilUtenlandsopphold.fraogmed" />}
                    />
                    <ExpansionCard size="small" aria-label="">
                        <ExpansionCard.Header>
                            <ExpansionCard.Title>
                                <FormattedMessage id="vedlegg.hvordanTaBilder" />
                            </ExpansionCard.Title>
                        </ExpansionCard.Header>
                        <ExpansionCard.Content>
                            <PictureScanningGuide backgroundColor="white" />
                        </ExpansionCard.Content>
                    </ExpansionCard>
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
