import Environment from 'appData/Environment';
import { ContextDataType, useContextGetData, useContextSaveData } from 'appData/SvpDataContext';
import useStepConfig from 'appData/useStepConfig';
import useSvpNavigator from 'appData/useSvpNavigator';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import {
    getArbeidsgiverNavnForTilrettelegging,
    getTilretteleggingId,
    getTypeArbeidForTilrettelegging,
} from 'utils/tilretteleggingUtils';

import { VStack } from '@navikt/ds-react';

import { getSaveAttachmentFetch } from '@navikt/fp-api';
import { AttachmentType, Skjemanummer, links } from '@navikt/fp-constants';
import { ErrorSummaryHookForm, RhfForm, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { Arbeidsforhold, Attachment, EGEN_NÆRING_ID, FRILANS_ID } from '@navikt/fp-types';
import { FileUploader, Step } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';

import Bedriftsbanner from '../Bedriftsbanner';

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

export const SkjemaSteg: FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    arbeidsforhold,
    maxAntallVedlegg = MAX_ANTALL_VEDLEGG,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(arbeidsforhold);
    const navigator = useSvpNavigator(mellomlagreSøknadOgNaviger, arbeidsforhold);

    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const arbeidsforholdOgInntekt = notEmpty(useContextGetData(ContextDataType.ARBEIDSFORHOLD_OG_INNTEKT));
    const tilretteleggingerVedlegg = useContextGetData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const valgteArbeidsforhold = useContextGetData(ContextDataType.VALGTE_ARBEIDSFORHOLD);

    const vti = useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const [valgtTilretteleggingId] = useState(vti); //For å unngå oppdatering ved forrige

    const oppdaterTilretteleggingerVedlegg = useContextSaveData(ContextDataType.TILRETTELEGGINGER_VEDLEGG);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);

    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

    const valgtId =
        valgtTilretteleggingId ||
        getTilretteleggingId(arbeidsforhold, barnet, arbeidsforholdOgInntekt, valgteArbeidsforhold);

    const onSubmit = (values: SkjemaFormData) => {
        if (values.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'SkjemaSteg.MinstEttDokument' }),
            });
            return Promise.resolve();
        }

        const antallVedleggAndreTilrettelegginger = tilretteleggingerVedlegg
            ? Object.keys(tilretteleggingerVedlegg)
                  .filter((id) => id !== valgtId)
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
            oppdaterTilretteleggingerVedlegg({ ...tilretteleggingerVedlegg, [valgtId]: values.vedlegg });
            oppdaterValgtTilretteleggingId(valgtId);

            return navigator.goToNextDefaultStep();
        }
    };

    const defaultValues = {
        vedlegg: tilretteleggingerVedlegg ? tilretteleggingerVedlegg[valgtId] : undefined,
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

    const typeArbeidsgiver = getTypeArbeidForTilrettelegging(valgtId, arbeidsforhold);
    const navnArbeidsgiver = getArbeidsgiverNavnForTilrettelegging(intl, valgtId, arbeidsforhold);

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
                    {valgteArbeidsforhold && valgteArbeidsforhold.length > 1 && (
                        <Bedriftsbanner arbeidsforholdType={typeArbeidsgiver} arbeidsforholdNavn={navnArbeidsgiver} />
                    )}
                    <VStack gap="4">
                        <FileUploader
                            label={finnFileUploaderLabel(intl, valgtId)}
                            description={
                                valgtId === FRILANS_ID || valgtId === EGEN_NÆRING_ID ? (
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
                            saveAttachment={getSaveAttachmentFetch(Environment.PUBLIC_PATH, 'svangerskapspenger')}
                        />
                    </VStack>
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            if (valgteArbeidsforhold) {
                                const indexForrige = valgteArbeidsforhold.findIndex((id) => id === valgtId) - 1;

                                oppdaterValgtTilretteleggingId(
                                    indexForrige < 0 ? undefined : valgteArbeidsforhold[indexForrige - 1],
                                );
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
