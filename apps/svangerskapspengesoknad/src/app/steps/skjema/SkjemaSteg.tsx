import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, VStack } from '@navikt/ds-react';
import { Step, intlUtils } from '@navikt/fp-common';
import { notEmpty } from '@navikt/fp-validation';
import { FileUploader } from '@navikt/fp-ui';
import { Attachment } from '@navikt/fp-types';
import { getSaveAttachment } from '@navikt/fp-api';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import actionCreator from 'app/context/action/actionCreator';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import SøknadRoutes from 'app/routes/routes';
import Bedriftsbanner from 'app/components/bedriftsbanner/Bedriftsbanner';
import Environment from 'app/Environment';
import SkjemaopplastningTekstFrilansSN from './components/SkjemaopplastningTekstFrilansSN';
import SkjemaopplastningTekstArbeidsgiver from './components/SkjemaopplastningTekstArbeidsgiver';
import stepConfig, { getBackLinkForSkjemaSteg } from '../stepsConfig';
import { useNavigate } from 'react-router-dom';

const MAX_ANTALL_VEDLEGG = 40;

export interface SkjemaFormData {
    vedlegg: Attachment[];
}

export interface Props {
    id: string;
}

const SkjemaSteg: FunctionComponent<Props> = ({ id }) => {
    useUpdateCurrentTilretteleggingId(id);
    const navigate = useNavigate();

    const intl = useIntl();
    const onAvbrytSøknad = useAvbrytSøknad();
    const { arbeidsforhold } = useSøkerinfo();
    const søknad = useSøknad();
    const { søker, barn, tilrettelegging } = søknad;

    const [antallForMangeVedlegg] = useState(0);
    const [submitClicked, setSubmitClicked] = useState(false);

    const currentTilrettelegging = notEmpty(tilrettelegging.find((t) => t.id === id));

    const onValidSubmitHandler = (values: SkjemaFormData) => {
        const oppdatertTilrettelegging = {
            ...currentTilrettelegging,
            vedlegg: values.vedlegg,
        };

        const alleTilrettelegginger = tilrettelegging.map((t) => {
            return t.id === currentTilrettelegging.id ? oppdatertTilrettelegging : t;
        });

        return [actionCreator.setTilrettelegging(alleTilrettelegginger)];
    };

    const nextRoute = `${SøknadRoutes.TILRETTELEGGING}/${currentTilrettelegging.id}`;
    const { handleSubmit } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    const handleOnSubmit = (values: SkjemaFormData) => {
        if (values.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: intl.formatMessage({ id: 'SkjemaSteg.MinstEttDokument' }),
            });
            return Promise.resolve();
        } else {
            setSubmitClicked(true);
            if (antallForMangeVedlegg <= 0) {
                return handleSubmit(values);
            } else {
                return Promise.resolve();
            }
        }
    };

    // onClick={() => {
    //     const antallVedleggAndreTilrettelegginger = tilrettelegging
    //         .filter((t) => t.id !== currentTilrettelegging!.id)
    //         .reduce((total, tilrettelegging) => total + tilrettelegging.vedlegg.length, 0);
    //     const antallNyeVedlegg = formValues.vedlegg ? formValues.vedlegg.length : 0;
    //     const antallVedlegg = antallVedleggAndreTilrettelegginger + antallNyeVedlegg;
    //     setAntallForMangeVedlegg(antallVedlegg - MAX_ANTALL_VEDLEGG);
    // }}

    const defaultValues = { vedlegg: currentTilrettelegging.vedlegg };

    const formMethods = useForm<SkjemaFormData>({
        defaultValues: defaultValues,
    });

    const updateAttachments = (attachments: Attachment[]) => {
        formMethods.setValue('vedlegg', attachments, { shouldDirty: true, shouldTouch: true });
        formMethods.clearErrors('vedlegg');
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
            onCancel={onAvbrytSøknad}
            steps={stepConfig(intl, søknad, arbeidsforhold)}
            supportsTempSaving={false}
        >
            <Form formMethods={formMethods} onSubmit={handleOnSubmit}>
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
                    {antallForMangeVedlegg > 0 && submitClicked && (
                        <Alert variant="error">
                            <FormattedMessage
                                id="skjema.maks40Filer"
                                values={{ antallVedlegg: antallForMangeVedlegg }}
                            />
                        </Alert>
                    )}
                    <StepButtonsHookForm
                        goToPreviousStep={() =>
                            navigate(
                                getBackLinkForSkjemaSteg(
                                    barn.termindato,
                                    arbeidsforhold,
                                    søker,
                                    tilrettelegging,
                                    currentTilrettelegging.id,
                                ),
                            )
                        }
                    />
                </VStack>
            </Form>
        </Step>
    );
};

export default SkjemaSteg;
