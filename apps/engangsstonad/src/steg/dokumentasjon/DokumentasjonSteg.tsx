import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import useEsNavigator from 'appData/useEsNavigator';
import useStepConfig from 'appData/useStepConfig';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import Dokumentasjon from 'types/Dokumentasjon';
import { erAdopsjon, erBarnetIkkeFødt } from 'types/OmBarnet';

import { VStack } from '@navikt/ds-react';

import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Attachment } from '@navikt/fp-types';
import { ScanDocumentInfo, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import AdopsjonDokPanel from './AdopsjonDokPanel';
import TerminDokPanel from './TerminDokPanel';

type Props = {
    mellomlagreOgNaviger: () => Promise<void>;
};

const DokumentasjonSteg: React.FunctionComponent<Props> = ({ mellomlagreOgNaviger }) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useEsNavigator(mellomlagreOgNaviger);
    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

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
        setAvventerVedlegg(hasPendingUploads);
        formMethods.setValue('vedlegg', attachments, { shouldDirty: true, shouldTouch: true });
        formMethods.clearErrors('vedlegg');
    };

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}
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
                        isDisabledAndLoading={avventerVedlegg}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default DokumentasjonSteg;
