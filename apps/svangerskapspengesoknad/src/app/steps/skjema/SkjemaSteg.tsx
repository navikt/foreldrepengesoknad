import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { VStack } from '@navikt/ds-react';
import { Step } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import { FileUploader } from '@navikt/fp-ui';
import { Attachment } from '@navikt/fp-types';
import { getSaveAttachment } from '@navikt/fp-api';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import SøknadRoutes from 'app/routes/routes';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';
import Environment from 'app/Environment';
import SkjemaopplastningTekstFrilansSN from './components/SkjemaopplastningTekstFrilansSN';
import SkjemaopplastningTekstArbeidsgiver from './components/SkjemaopplastningTekstArbeidsgiver';
import { getBackLinkForSkjemaSteg, useStepConfig } from '../stepsConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';

const MAX_ANTALL_VEDLEGG = 40;

export interface SkjemaFormData {
    vedlegg: Attachment[];
}

export interface Props {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
    maxAntallVedlegg?: number;
}

const SkjemaSteg: FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
    maxAntallVedlegg = MAX_ANTALL_VEDLEGG,
}) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);

    const inntektsinformasjon = notEmpty(useContextGetData(ContextDataType.INNTEKTSINFORMASJON));
    const tilrettelegginger = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGINGER));
    const vti = notEmpty(useContextGetData(ContextDataType.VALGT_TILRETTELEGGING_ID));
    const [valgtTilretteleggingId] = useState(vti); //For å unngå oppdatering ved forrige
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterTilrettelegginger = useContextSaveData(ContextDataType.TILRETTELEGGINGER);
    const oppdaterValgtTilretteleggingId = useContextSaveData(ContextDataType.VALGT_TILRETTELEGGING_ID);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

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
            oppdaterAppRoute(SøknadRoutes.TILRETTELEGGING);

            return mellomlagreSøknadOgNaviger();
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
            activeStepId={`skjema-${valgtTilrettelegging.id}`}
            pageTitle={
                tilrettelegginger.length > 1
                    ? intl.formatMessage(
                          { id: 'steps.label.skjema.flere' },
                          {
                              navn: valgtTilrettelegging.arbeidsforhold.navn,
                          },
                      )
                    : intl.formatMessage({ id: 'steps.label.skjema.en' })
            }
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {tilrettelegginger.length > 1 && <Bedriftsbanner arbeid={valgtTilrettelegging.arbeidsforhold} />}
                    <VStack gap="4">
                        {erSNEllerFrilans && <SkjemaopplastningTekstFrilansSN typeArbeid={typeArbeid} />}
                        {!erSNEllerFrilans && <SkjemaopplastningTekstArbeidsgiver />}
                        <FileUploader
                            attachmentType={AttachmentType.TILRETTELEGGING}
                            skjemanummer={Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING}
                            existingAttachments={defaultValues?.vedlegg}
                            updateAttachments={updateAttachments}
                            saveAttachment={getSaveAttachment(Environment.REST_API_URL, 'svangerskapspenger')}
                        />
                    </VStack>
                    <StepButtonsHookForm
                        goToPreviousStep={() => {
                            const linkData = getBackLinkForSkjemaSteg(
                                barnet.termindato,
                                søkerInfo.arbeidsforhold,
                                inntektsinformasjon,
                                tilrettelegginger,
                                valgtTilrettelegging.id,
                            );

                            if (linkData.previousTilretteleggingId) {
                                oppdaterValgtTilretteleggingId(linkData.previousTilretteleggingId);
                            }
                            oppdaterAppRoute(linkData.previousRoute);
                            mellomlagreSøknadOgNaviger();
                        }}
                        isDisabledAndLoading={avventerVedlegg}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default SkjemaSteg;
