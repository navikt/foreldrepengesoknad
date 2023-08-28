import { Button, Label, ReadMore } from '@navikt/ds-react';
import { Block, FormikFileUploader, Step, StepButtonWrapper, intlUtils } from '@navikt/fp-common';
import AttachmentList from 'app/components/attachmentList/AttachmentList';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import links from 'app/links/links';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { FormattedMessage, useIntl } from 'react-intl';
import { SkjemaFormComponents, SkjemaFormData, SkjemaFormField } from './skjemaFormTypes';
import stepConfig, { getPreviousStepHref } from '../stepsConfig';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { AttachmentType } from 'app/types/AttachmentType';
import { deleteAttachment } from '@navikt/fp-common/src/common/utils/attachmentUtils';
import { Skjemanummer } from 'app/types/Skjemanummer';
import actionCreator from 'app/context/action/actionCreator';
import { getInitialSkjemaValuesFromState } from './skjemaFormUtils';
import { Link } from 'react-router-dom';

const Skjema: React.FunctionComponent = () => {
    const intl = useIntl();
    const { state } = useSvangerskapspengerContext();
    // const { tilretteleggingBehov } = state;
    const onValidSubmitHandler = (values: Partial<SkjemaFormData>) => {
        console.log(values);
        return [actionCreator.setVedlegg(values.vedlegg!)];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.PERIODE);

    //TODO: sjemanummer må hentes ut basert på arbeidsgiver man setter
    const skjemanummer = Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG;
    // type === Arbeidsforholdstype.VIRKSOMHET
    //     ? Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING
    //     : Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG;
    return (
        <SkjemaFormComponents.FormikWrapper
            initialValues={getInitialSkjemaValuesFromState(state)}
            onSubmit={handleSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="skjema"
                        pageTitle={'Tilretteleggingskjema'}
                        // onCancel={onAvbrytSøknad}
                        // onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl)}
                    >
                        <SkjemaFormComponents.Form
                            includeButtons={false}
                            includeValidationSummary={true}
                            // cleanup={(values) => cleanupSkjemaFormData(values, visibility)}
                        >
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
                                    name={SkjemaFormField.vedlegg}
                                    attachments={formValues.vedlegg || []}
                                    attachmentType={AttachmentType.TILRETTELEGGING}
                                    skjemanummer={skjemanummer}
                                    validateHasAttachment={true}
                                    label={intlUtils(intl, 'tilrettelegging.vedlegg.label')}
                                />
                                <AttachmentList
                                    vedlegg={formValues.vedlegg!}
                                    onDelete={(file: Attachment) => {
                                        setFieldValue(
                                            SkjemaFormField.vedlegg,
                                            deleteAttachment(formValues.vedlegg!, file)
                                        );
                                    }}
                                />
                                <ReadMore header={'Les om hvordan ta et bra bilde'}>
                                    <div>TODO</div>
                                </ReadMore>
                            </Block>
                            <Block margin="l">
                                <StepButtonWrapper>
                                    <Button variant="secondary" as={Link} to={getPreviousStepHref('skjema')}>
                                        <FormattedMessage id="backlink.label" />
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
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
