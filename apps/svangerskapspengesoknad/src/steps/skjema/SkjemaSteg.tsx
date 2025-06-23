import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import { RouteParams } from 'appData/routes';
import { useStepConfig } from 'appData/useStepConfig';
import { useSvpNavigator } from 'appData/useSvpNavigator';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { getArbeidsgiverNavnForTilrettelegging, getTypeArbeidForTilrettelegging } from 'utils/tilretteleggingUtils';

import { Link, VStack } from '@navikt/ds-react';

import { getSaveAttachmentFetch } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer, links } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold, Attachment, FRILANS_ID } from '@navikt/fp-types';
import { FileUploader, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { Bedriftsbanner } from '../Bedriftsbanner';

const MAX_ANTALL_VEDLEGG = 40;

const finnFileUploaderLabel = (intl: IntlShape, typeArbeid: string) => {
    if (typeArbeid === EGEN_NÆRING_ID) {
        return intl.formatMessage({ id: 'skjema.vedlegg.label.selvstendig' });
    }
    if (typeArbeid === FRILANS_ID) {
        return intl.formatMessage({ id: 'skjema.vedlegg.label.frilanser' });
    }
    return intl.formatMessage({ id: 'skjema.vedlegg.label.arbeidsgiver' });
};

type SkjemaFormData = {
    vedlegg: Attachment[];
};

interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
    maxAntallVedlegg?: number;
}

export const SkjemaSteg = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
    maxAntallVedlegg = MAX_ANTALL_VEDLEGG,
}: Props) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const params = useParams<RouteParams>();
    const tilretteleggingId = notEmpty(params.tilretteleggingId);

    const tilretteleggingerVedlegg = useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);

    const oppdaterTilretteleggingerVedlegg = useContextSaveData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);

    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

    const onSubmit = (values: SkjemaFormData) => {
        if (values.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'SkjemaSteg.MinstEttDokument' }),
            });
            return Promise.resolve();
        }

        const antallVedleggAndreTilrettelegginger = tilretteleggingerVedlegg
            ? Object.keys(tilretteleggingerVedlegg)
                  .filter((id) => id !== tilretteleggingId)
                  .reduce((total, id) => total + tilretteleggingerVedlegg[id].length, 0)
            : 0;
        const antallNyeVedlegg = values.vedlegg ? values.vedlegg.length : 0;
        const antallVedlegg = antallVedleggAndreTilrettelegginger + antallNyeVedlegg;

        const antallForMange = antallVedlegg - maxAntallVedlegg;
        if (antallForMange > 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'skjema.maks40Filer' }, { antallVedlegg: antallForMange }),
            });
            return Promise.resolve();
        } else {
            oppdaterTilretteleggingerVedlegg({ ...tilretteleggingerVedlegg, [tilretteleggingId]: values.vedlegg });

            return navigator.goToNextDefaultStep();
        }
    };

    const defaultValues = {
        vedlegg: tilretteleggingerVedlegg ? tilretteleggingerVedlegg[tilretteleggingId] : undefined,
    };

    const formMethods = useForm<SkjemaFormData>({
        defaultValues: defaultValues,
    });

    const updateAttachments = (attachments: Attachment[], hasPendingUploads: boolean) => {
        setAvventerVedlegg(hasPendingUploads);
        formMethods.setValue('vedlegg', attachments, { shouldDirty: true, shouldTouch: true });
        if (!hasPendingUploads) {
            formMethods.clearErrors('vedlegg');
        }
    };

    const typeArbeidsgiver = getTypeArbeidForTilrettelegging(tilretteleggingId, arbeidsforhold);
    const navnArbeidsgiver = getArbeidsgiverNavnForTilrettelegging(intl, tilretteleggingId, arbeidsforhold);

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
            onStepChange={navigator.goToStep}
            noFieldsRequired
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {valgteArbeidsforhold && valgteArbeidsforhold.length > 1 && (
                        <Bedriftsbanner arbeidsforholdType={typeArbeidsgiver} arbeidsforholdNavn={navnArbeidsgiver} />
                    )}
                    <VStack gap="4">
                        <FileUploader
                            label={finnFileUploaderLabel(intl, tilretteleggingId)}
                            description={
                                tilretteleggingId === FRILANS_ID || tilretteleggingId === EGEN_NÆRING_ID ? (
                                    <FormattedMessage id="skjema.vedlegg.description.frilansSN" />
                                ) : (
                                    <FormattedMessage
                                        id={'skjema.vedlegg.description.arbeidsgiver'}
                                        values={{
                                            a: (msg: any) => (
                                                <Link
                                                    rel="noopener noreferrer"
                                                    href={links.arbeidstilsynetSkjema}
                                                    target="_blank"
                                                >
                                                    {msg}
                                                </Link>
                                            ),
                                        }}
                                    />
                                )
                            }
                            attachmentType={AttachmentType.TILRETTELEGGING}
                            skjemanummer={Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING}
                            existingAttachments={defaultValues?.vedlegg}
                            updateAttachments={updateAttachments}
                            saveAttachment={getSaveAttachmentFetch(import.meta.env.BASE_URL, 'svangerskapspenger')}
                        />
                    </VStack>
                    <StepButtonsHookForm
                        goToPreviousStep={navigator.goToPreviousDefaultStep}
                        isDisabledAndLoading={avventerVedlegg}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};
