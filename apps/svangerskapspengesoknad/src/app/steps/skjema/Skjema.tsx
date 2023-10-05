import { Alert, Button } from '@navikt/ds-react';
import { Block, FormikFileUploader, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import AttachmentList from 'app/components/attachment-list/AttachmentList';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { FormattedMessage, useIntl } from 'react-intl';
import { SkjemaFormComponents, SkjemaFormData, SkjemaFormField } from './skjemaFormTypes';
import stepConfig, { getBackLinkForSkjemaSteg } from '../stepsConfig';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { deleteAttachment } from '@navikt/fp-common/src/common/utils/attachmentUtils';
import { Skjemanummer } from 'app/types/Skjemanummer';
import actionCreator from 'app/context/action/actionCreator';
import { getInitialSkjemaValuesFromState, mapTilretteleggingMedSkjema } from './skjemaFormUtils';
import { Link } from 'react-router-dom';
import { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { FunctionComponent, useState } from 'react';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import SkjemaopplastningTekstFrilansSN from './components/SkjemaopplastningTekstFrilansSN';
import SkjemaopplastningTekstArbeidsgiver from './components/SkjemaopplastningTekstArbeidsgiver';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import InfoScanneDokument from './components/scanne-dokument/InfoScanneDokument';
import ArbeidsgiverVisning from '../tilrettelegging/components/ArbeidsgiverVisning';
import SøknadRoutes from 'app/routes/routes';

const MAX_ANTALL_VEDLEGG = 40;
interface Props {
    id: string;
    typeArbeid: Arbeidsforholdstype;
    navn: string;
}

const Skjema: FunctionComponent<Props> = ({ navn, id, typeArbeid }) => {
    useUpdateCurrentTilretteleggingId(id);
    const intl = useIntl();
    const { arbeidsforhold } = useSøkerinfo();
    const { søker, barn, tilrettelegging } = useSøknad();
    const { frilansInformasjon, selvstendigNæringsdrivendeInformasjon } = søker;
    const onAvbrytSøknad = useAvbrytSøknad();
    const [antallForMangeVedlegg, setAntallForMangeVedlegg] = useState(0);
    const [submitClicked, setSubmitClicked] = useState(false);
    const flereTilrettelegginger = tilrettelegging.length > 1;
    const currentTilrettelegging = tilrettelegging.find((t) => t.id === id);
    const nextRoute = `${SøknadRoutes.TILRETTELEGGING}/${currentTilrettelegging!.id}`;

    const onValidSubmitHandler = (values: Partial<SkjemaFormData>) => {
        const mappedTilrettelegging = mapTilretteleggingMedSkjema(
            tilrettelegging,
            currentTilrettelegging!,
            values as SkjemaFormData,
        );
        return [actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };
    const erFlereTilrettelegginger = tilrettelegging.length > 1;
    const sideTittel = erFlereTilrettelegginger
        ? intlUtils(intl, 'steps.label.skjema.flere', { navn })
        : intlUtils(intl, 'steps.label.skjema.en');
    const key = id;
    const skjemanummer =
        typeArbeid === Arbeidsforholdstype.VIRKSOMHET || typeArbeid === Arbeidsforholdstype.PRIVAT
            ? Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING
            : Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG;

    const erSNEllerFrilans =
        typeArbeid === Arbeidsforholdstype.FRILANSER || typeArbeid === Arbeidsforholdstype.SELVSTENDIG;
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nextRoute);

    const handleOnSubmit = (values: any) => {
        setSubmitClicked(true);

        if (antallForMangeVedlegg <= 0) {
            handleSubmit(values);
        }
    };
    return (
        <SkjemaFormComponents.FormikWrapper
            initialValues={getInitialSkjemaValuesFromState(currentTilrettelegging!)}
            onSubmit={handleOnSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="skjema"
                        pageTitle={sideTittel}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                    >
                        <SkjemaFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            <Block key={key}>
                                {flereTilrettelegginger && (
                                    <Block padBottom="xxl">
                                        <ArbeidsgiverVisning
                                            currentTilrettelegging={currentTilrettelegging!}
                                            arbeidsforhold={arbeidsforhold}
                                            frilans={frilansInformasjon}
                                            egenNæring={selvstendigNæringsdrivendeInformasjon}
                                        />
                                    </Block>
                                )}
                                <div>
                                    {erSNEllerFrilans && <SkjemaopplastningTekstFrilansSN typeArbeid={typeArbeid} />}

                                    {!erSNEllerFrilans && <SkjemaopplastningTekstArbeidsgiver />}
                                    {formValues.vedlegg && formValues.vedlegg.length > 0 && (
                                        <AttachmentList
                                            vedlegg={formValues.vedlegg}
                                            onDelete={(file: Attachment) => {
                                                setSubmitClicked(false);
                                                setFieldValue(
                                                    SkjemaFormField.vedlegg,
                                                    deleteAttachment(formValues.vedlegg!, file),
                                                );
                                            }}
                                        />
                                    )}
                                    <Block padBottom="xxl">
                                        <FormikFileUploader
                                            name={SkjemaFormField.vedlegg}
                                            buttonLabel={intlUtils(intl, 'skjema.vedlegg.buttonLabel')}
                                            legend=""
                                            label={`Last opp dokument`}
                                            attachments={formValues.vedlegg || []}
                                            attachmentType={AttachmentType.TILRETTELEGGING}
                                            skjemanummer={skjemanummer}
                                            validateHasAttachment={true}
                                            onFileInputClick={() => setSubmitClicked(false)}
                                        />
                                    </Block>
                                </div>
                            </Block>

                            <Block padBottom="xxl">
                                <InfoScanneDokument />
                            </Block>
                            {antallForMangeVedlegg > 0 && submitClicked && (
                                <Block padBottom="l">
                                    <Alert variant="error">
                                        {intlUtils(intl, 'skjema.maks40Filer', {
                                            antallVedlegg: antallForMangeVedlegg,
                                        })}
                                    </Alert>
                                </Block>
                            )}
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={getBackLinkForSkjemaSteg(
                                            barn.termindato,
                                            arbeidsforhold,
                                            søker,
                                            tilrettelegging,
                                            currentTilrettelegging!.id,
                                        )}
                                    >
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                        onClick={() => {
                                            const antallVedleggAndreTilrettelegginger = tilrettelegging
                                                .filter((t) => t.id !== currentTilrettelegging!.id)
                                                .reduce((total, tilrettelegging) => {
                                                    return (total += tilrettelegging.vedlegg.length);
                                                }, 0);
                                            const antallNyeVedlegg = formValues.vedlegg ? formValues.vedlegg.length : 0;
                                            const antallVedlegg =
                                                antallVedleggAndreTilrettelegginger + antallNyeVedlegg;
                                            setAntallForMangeVedlegg(antallVedlegg - MAX_ANTALL_VEDLEGG);
                                        }}
                                    >
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </SkjemaFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default Skjema;
