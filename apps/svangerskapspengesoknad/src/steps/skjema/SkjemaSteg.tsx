import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { Arbeidsforholdstype, Tilrettelegging } from 'types/Tilrettelegging';

import { VStack } from '@navikt/ds-react';

import { getSaveAttachment } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer, links } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, Attachment } from '@navikt/fp-types';
import { FileUploader, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import { AxiosInstanceAPI } from '../../app/api/AxiosInstance';
import Bedriftsbanner from '../Bedriftsbanner';

const MAX_ANTALL_VEDLEGG = 40;

const finnLabel = (intl: IntlShape, typeArbeid: Arbeidsforholdstype) => {
    if (typeArbeid === Arbeidsforholdstype.FRILANSER) {
        return intl.formatMessage({ id: 'skjema.vedlegg.label.frilanser' });
    }
    if (typeArbeid === Arbeidsforholdstype.SELVSTENDIG) {
        return intl.formatMessage({ id: 'skjema.vedlegg.label.selvstendig' });
    }
    throw Error('Har ingen tekst for kode: ' + typeArbeid);
};

const getForrigeTilretteleggingId = (
    tilretteleggingBehov: Tilrettelegging[],
    currentTilretteleggingId: string | undefined,
): string | undefined => {
    if (currentTilretteleggingId === undefined && tilretteleggingBehov.length > 0) {
        return tilretteleggingBehov[tilretteleggingBehov.length - 1].id;
    }
    const forrigeTilretteleggingIndex = tilretteleggingBehov.findIndex((t) => t.id === currentTilretteleggingId) - 1;
    if (forrigeTilretteleggingIndex < 0) {
        return undefined;
    }
    return tilretteleggingBehov[forrigeTilretteleggingIndex].id;
};

export interface SkjemaFormData {
    vedlegg: Attachment[];
}

export interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    arbeidsforhold: Arbeidsforhold[];
    maxAntallVedlegg?: number;
}

const SkjemaSteg: FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
    maxAntallVedlegg = MAX_ANTALL_VEDLEGG,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const vti = notEmpty(useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID));
    const [valgtTilretteleggingId] = useState(vti); //For å unngå oppdatering ved forrige

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

    const valgtTilrettelegging = notEmpty(tilrettelegginger.find((t) => t.id === valgtTilretteleggingId));

    const onSubmit = (values: SkjemaFormData) => {
        if (values.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'SkjemaSteg.MinstEttDokument' }),
            });
            return Promise.resolve();
        }

        const antallVedleggAndreTilrettelegginger = tilrettelegginger
            .filter((t) => t.id !== valgtTilrettelegging!.id)
            .reduce((total, tilrettelegging) => total + tilrettelegging.vedlegg.length, 0);
        const antallNyeVedlegg = values.vedlegg ? values.vedlegg.length : 0;
        const antallVedlegg = antallVedleggAndreTilrettelegginger + antallNyeVedlegg;

        const antallForMange = antallVedlegg - maxAntallVedlegg;
        if (antallForMange > 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'skjema.maks40Filer' }, { antallVedlegg: antallForMange }),
            });
            return Promise.resolve();
        } else {
            const oppdatertTilrettelegginger = {
                ...valgtTilrettelegging,
                vedlegg: values.vedlegg,
            };

            const alleValgteTilrettelegginger = tilrettelegginger.map((t) => {
                return t.id === valgtTilrettelegging.id ? oppdatertTilrettelegginger : t;
            });

            oppdaterTilrettelegginger(alleValgteTilrettelegginger);
            oppdaterValgtTilretteleggingId(valgtTilrettelegging.id);

            return navigator.goToNextDefaultStep();
        }
    };

    const defaultValues = { vedlegg: valgtTilrettelegging.vedlegg };

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

    const typeArbeid = valgtTilrettelegging.arbeidsforhold.type;
    const erSNEllerFrilans =
        typeArbeid === Arbeidsforholdstype.FRILANSER || typeArbeid === Arbeidsforholdstype.SELVSTENDIG;

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={navigator.fortsettSøknadSenere}
            onStepChange={navigator.goToNextStep}
            noFieldsRequired
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {tilrettelegginger.length > 1 && <Bedriftsbanner arbeid={valgtTilrettelegging.arbeidsforhold} />}
                    <VStack gap="4">
                        <FileUploader
                            label={
                                erSNEllerFrilans
                                    ? finnLabel(intl, typeArbeid)
                                    : intl.formatMessage({ id: 'skjema.vedlegg.label.arbeidsgiver' })
                            }
                            description={
                                erSNEllerFrilans ? (
                                    <FormattedMessage id="skjema.vedlegg.description.frilansSN" />
                                ) : (
                                    <FormattedMessage
                                        id={'skjema.vedlegg.description.arbeidsgiver'}
                                        values={{
                                            a: (msg: any) => (
                                                <a
                                                    className="lenke"
                                                    rel="noopener noreferrer"
                                                    href={links.arbeidstilsynetSkjema}
                                                    target="_blank"
                                                >
                                                    {msg}
                                                </a>
                                            ),
                                        }}
                                    />
                                )
                            }
                            attachmentType={AttachmentType.TILRETTELEGGING}
                            skjemanummer={Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING}
                            existingAttachments={defaultValues?.vedlegg}
                            updateAttachments={updateAttachments}
                            saveAttachment={getSaveAttachment(AxiosInstanceAPI(), 'svangerskapspenger')}
                        />
                    </VStack>
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            const forrigeTilretteleggingId = getForrigeTilretteleggingId(
                                tilrettelegginger,
                                valgtTilrettelegging.id,
                            );
                            if (forrigeTilretteleggingId) {
                                oppdaterValgtTilretteleggingId(forrigeTilretteleggingId);
                            }
                            navigator.goToPreviousDefaultStep();
                        }}
                        isDisabledAndLoading={avventerVedlegg}
                    />
                </VStack>
            </RhfForm>
        </Step>
    );
};

export default SkjemaSteg;
