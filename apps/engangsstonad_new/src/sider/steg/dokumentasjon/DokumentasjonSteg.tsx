import { useCallback } from 'react';
import { ExpansionCard, VStack } from '@navikt/ds-react';
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
import { erAdopsjon, erBarnetIkkeFødt } from 'types/OmBarnet';
import { Attachment } from 'fpcommon/uploader/typer/Attachment';
import { notEmpty } from 'fpcommon/validering/valideringUtil';
import AdopsjonDokPanel from './AdopsjonDokPanel';
import TerminDokPanel from './TerminDokPanel';

const DokumentasjonSteg: React.FunctionComponent = () => {
    const intl = useIntl();

    const stepData = useStepData();
    const navigator = useEsNavigator();

    const dokumentasjon = useEsStateData(EsDataType.DOKUMENTASJON);
    const lagreDokumentasjon = useEsStateSaveFn(EsDataType.DOKUMENTASJON);
    const omBarnet = notEmpty(useEsStateData(EsDataType.OM_BARNET));

    const erBarnetAdoptert = erAdopsjon(omBarnet);
    const harTermindato = erBarnetIkkeFødt(omBarnet);

    const formMethods = useForm<Dokumentasjon>({
        defaultValues: dokumentasjon,
    });

    const lagre = useCallback((formValues: Dokumentasjon) => {
        if (formValues.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'DokumentasjonSteg.MinstEttDokument' }),
            });
        } else {
            lagreDokumentasjon(formValues);
            navigator.goToNextDefaultStep();
        }
    }, []);

    const updateAttachments = useCallback((attachments: Attachment[]) => {
        formMethods.setValue('vedlegg', attachments);
        formMethods.clearErrors('vedlegg');
    }, []);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            pageTitle={stepData.stepConfig.find((c) => c.id === stepData.activeStepId)?.label || '-'}
            onCancel={navigator.avbrytSøknad}
            steps={stepData.stepConfig}
            activeStepId={stepData.activeStepId}
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
