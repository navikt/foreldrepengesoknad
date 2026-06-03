import { zodResolver } from '@hookform/resolvers/zod';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/EsDataContext';
import { useEsNavigator } from 'appData/useEsNavigator';
import { useStepConfig } from 'appData/useStepConfig';
import { lagDokumentasjonSchema } from 'schemas/dokumentasjonSchema';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Dokumentasjon } from 'types/Dokumentasjon';

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
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erBarnetAdoptert = barn.type === 'adopsjon';
    const harTermindato = barn.type === 'termin';
    const termindato = barn.type === 'termin' ? barn.termindato : undefined;

    const formMethods = useForm<Dokumentasjon>({
        defaultValues: dokumentasjon,
        resolver: zodResolver(
            lagDokumentasjonSchema(intl, { erTermin: harTermindato, termindato }),
        ),
    });

    const lagre = (formValues: Dokumentasjon) => {
        oppdaterDokumentasjon(formValues);
        return navigator.goToNextDefaultStep();
    };

    const updateAttachments = (attachments: Attachment[], hasPendingUploads: boolean) => {
        setAvventerVedlegg(hasPendingUploads);
        formMethods.setValue('vedlegg', attachments, { shouldDirty: true, shouldTouch: true });
        formMethods.clearErrors('vedlegg');
    };

    return (
        <SkjemaRotLayout pageTitle={intl.formatMessage({ id: 'Søknad.Pageheading' })}>
            <Step onStepChange={void navigator.goToNextStep} steps={stepConfig} noFieldsRequired>
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
                                termindato={termindato ?? ''}
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
