import { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { VStack } from '@navikt/ds-react';
import { AttachmentType, Step, intlUtils } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import { FileUploader } from '@navikt/fp-ui';
import { Attachment } from '@navikt/fp-types';
import { getSaveAttachment } from '@navikt/fp-api';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { Søkerinfo } from 'app/types/Søkerinfo';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import SøknadRoutes from 'app/routes/routes';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';
import Environment from 'app/Environment';
import SkjemaopplastningTekstFrilansSN from './components/SkjemaopplastningTekstFrilansSN';
import SkjemaopplastningTekstArbeidsgiver from './components/SkjemaopplastningTekstArbeidsgiver';
import { getBackLinkForSkjemaSteg, useStepConfig } from '../stepsConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';

const MAX_ANTALL_VEDLEGG = 40;

export interface SkjemaFormData {
    vedlegg: Attachment[];
}

export interface Props {
    id: string;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => Promise<void>;
    søkerInfo: Søkerinfo;
    maxAntallVedlegg?: number;
}

const SkjemaSteg: FunctionComponent<Props> = ({
    id,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
    maxAntallVedlegg = MAX_ANTALL_VEDLEGG,
}) => {
    useUpdateCurrentTilretteleggingId(id);
    const navigate = useNavigate();
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold);

    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const tilrettelegging = notEmpty(useContextGetData(ContextDataType.TILRETTELEGGING));
    const barnet = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const oppdaterTilrettelegging = useContextSaveData(ContextDataType.TILRETTELEGGING);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const [avventerVedlegg, setAvventerVedlegg] = useState(false);

    const currentTilrettelegging = notEmpty(tilrettelegging.find((t) => t.id === id));

    const onSubmit = (values: SkjemaFormData) => {
        if (values.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'SkjemaSteg.MinstEttDokument' }),
            });
            return Promise.resolve();
        }

        const antallVedleggAndreTilrettelegginger = tilrettelegging
            .filter((t) => t.id !== currentTilrettelegging!.id)
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
            const oppdatertTilrettelegging = {
                ...currentTilrettelegging,
                vedlegg: values.vedlegg,
            };

            const alleTilrettelegginger = tilrettelegging.map((t) => {
                return t.id === currentTilrettelegging.id ? oppdatertTilrettelegging : t;
            });

            oppdaterTilrettelegging(alleTilrettelegginger);

            oppdaterAppRoute(`${SøknadRoutes.TILRETTELEGGING}/${currentTilrettelegging.id}`);

            return mellomlagreSøknadOgNaviger();
        }
    };

    const defaultValues = { vedlegg: currentTilrettelegging.vedlegg };

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

    const typeArbeid = currentTilrettelegging.arbeidsforhold.type;
    const erSNEllerFrilans =
        typeArbeid === Arbeidsforholdstype.FRILANSER || typeArbeid === Arbeidsforholdstype.SELVSTENDIG;

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId={`skjema-${id}`}
            pageTitle={
                tilrettelegging.length > 1
                    ? intlUtils(intl, 'steps.label.skjema.flere', { navn: currentTilrettelegging.arbeidsforhold.navn })
                    : intlUtils(intl, 'steps.label.skjema.en')
            }
            onCancel={avbrytSøknad}
            steps={stepConfig}
            onContinueLater={onFortsettSøknadSenere}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <VStack gap="10">
                    <ErrorSummaryHookForm />
                    {tilrettelegging.length > 1 && <Bedriftsbanner arbeid={currentTilrettelegging.arbeidsforhold} />}
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
                        goToPreviousStep={() =>
                            navigate(
                                getBackLinkForSkjemaSteg(
                                    barnet.termindato,
                                    søkerInfo.arbeidsforhold,
                                    søker,
                                    tilrettelegging,
                                    currentTilrettelegging.id,
                                ),
                            )
                        }
                        isDisabledAndLoading={avventerVedlegg}
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default SkjemaSteg;
