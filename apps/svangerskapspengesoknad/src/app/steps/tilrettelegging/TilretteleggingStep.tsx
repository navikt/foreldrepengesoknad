import { Block, FormikFileUploader, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import SøknadRoutes from 'app/routes/routes';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { Button, GuidePanel, Heading, Label, ReadMore } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    TilretteleggingFormComponents,
    TilretteleggingFormData,
    TilretteleggingFormField,
} from './tilretteleggingStepFormConfig';
import {
    cleanupOmTilretteleggingFormData,
    getTilretteleggingInitialValues,
    mapOmTilretteleggingFormDataToState,
} from './tilretteleggingStepUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import actionCreator from 'app/context/action/actionCreator';
import tilretteleggingQuestionsConfig from './tilretteleggingStepQuestionsConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { Arbeidsforholdstype, TilretteleggingInput } from 'app/types/Tilrettelegging';
import { Link } from 'react-router-dom';
import { FunctionComponent, useState } from 'react';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import { getNesteTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import links from 'app/links/links';
import AttachmentList from 'app/components/attachmentList/AttachmentList';
import { deleteAttachment } from '@navikt/fp-common/src/common/utils/attachmentUtils';
import DelvisTilretteleggingDetaljer from './components/delvisTilrettelegging/DelvisTilretteleggingDetaljer';
import dayjs from 'dayjs';

interface Props {
    id: string;
    type: Arbeidsforholdstype;
    navn: string;
}

const TilretteleggingStep: FunctionComponent<Props> = ({ type, navn, id }) => {
    const intl = useIntl();
    const { tilrettelegging } = useSøknad();
    const { state } = useSvangerskapspengerContext();
    const { tilretteleggingBehov, currentTilretteleggingId } = state;
    const vedlegg = [] as Attachment[]; //TODO: hent fra nåværende tilrettelegging.
    const onValidSubmitHandler = (values: Partial<TilretteleggingFormData>) => {
        console.log(values);
        const tilrettelegging = mapOmTilretteleggingFormDataToState(values);
        return [actionCreator.setTilrettelegging(tilrettelegging)];
    };
    const sideTittel = intlUtils(intl, 'steps.label.periode', { type: navn });
    const nesteRoute = getNesteTilretteleggingId(tilretteleggingBehov, currentTilretteleggingId)
        ? SøknadRoutes.PERIODE
        : SøknadRoutes.OPPSUMMERING;
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, nesteRoute);
    const skjemanummer =
        type === Arbeidsforholdstype.VIRKSOMHET
            ? Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING
            : Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG;
    const currentTilrettelegging = tilrettelegging.find((t) => t.id === id);
    const [tilretteleggingInput, setTilretteleggingInput] = useState<TilretteleggingInput[]>(
        currentTilrettelegging && currentTilrettelegging.tilrettelegginger
            ? currentTilrettelegging.tilrettelegginger
            : []
    );

    const allSortertTilrettelegging = tilretteleggingInput.sort((a, b) => {
        return dayjs(a.fom).isBefore(b.fom, 'day') ? -1 : 1;
    });
    return (
        <TilretteleggingFormComponents.FormikWrapper
            initialValues={getTilretteleggingInitialValues(tilrettelegging)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const visibility = tilretteleggingQuestionsConfig.getVisbility({
                    ...formValues,
                } as TilretteleggingFormData);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="periode"
                        pageTitle={sideTittel}
                        // onCancel={onAvbrytSøknad}
                        // onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, type)}
                    >
                        <TilretteleggingFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            cleanup={(values) => cleanupOmTilretteleggingFormData(values, visibility)}
                        >
                            <Block padBottom="xl">
                                <Heading level="2" size="small">
                                    {navn}
                                </Heading>
                            </Block>
                            <Block padBottom="xxxl">
                                <Block padBottom="l">
                                    <Label>{intlUtils(intl, 'tilrettelegging.vedlegg.label')}</Label>
                                </Block>
                                <FormattedMessage
                                    id="tilrettelegging.vedlegg.description"
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
                                <FormikFileUploader
                                    legend=""
                                    buttonLabel={intlUtils(intl, 'tilrettelegging.vedlegg.buttonLabel')}
                                    name={TilretteleggingFormField.vedlegg}
                                    attachments={vedlegg || []}
                                    attachmentType={AttachmentType.TILRETTELEGGING}
                                    skjemanummer={skjemanummer}
                                    validateHasAttachment={false}
                                    label={intlUtils(intl, 'tilrettelegging.vedlegg.label')}
                                />
                                <AttachmentList
                                    vedlegg={formValues.vedlegg!}
                                    onDelete={(file: Attachment) => {
                                        setFieldValue(
                                            TilretteleggingFormField.vedlegg,
                                            deleteAttachment(formValues.vedlegg!, file)
                                        );
                                    }}
                                />
                                <ReadMore header={'Les om hvordan ta et bra bilde'}>
                                    <div>TODO</div>
                                </ReadMore>
                            </Block>
                            <Block padBottom="xl">
                                <GuidePanel>{intlUtils(intl, 'tilrettelegging.veileder.intro')}</GuidePanel>
                            </Block>
                            <Block padBottom="xl">
                                <TilretteleggingFormComponents.DatePicker
                                    name={TilretteleggingFormField.tilrettelagtArbeidFom}
                                    label={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.label')}
                                    // minDate={halvannetÅrSiden(new Date())} //TODO
                                    // maxDate={dayjs().toDate()}
                                    // validate={validateFødselsdato(intl)}
                                    placeholder={'dd.mm.åååå'}
                                />
                                <ReadMore
                                    header={intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.lesMer.tittel')}
                                >
                                    {intlUtils(intl, 'tilrettelegging.tilrettelagtArbeidFom.lesMer.info')}
                                </ReadMore>
                            </Block>

                            <Block>
                                <DelvisTilretteleggingDetaljer
                                    tilretteleggingInput={allSortertTilrettelegging}
                                    setTilretteleggingInput={setTilretteleggingInput}
                                />
                            </Block>
                            <Block margin="xl">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('periode')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                        {intlUtils(intl, 'søknad.gåVidere')}
                                    </Button>
                                </StepButtonWrapper>
                            </Block>
                        </TilretteleggingFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default TilretteleggingStep;
