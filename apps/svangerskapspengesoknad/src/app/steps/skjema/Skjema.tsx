import { Button, Label, ReadMore } from '@navikt/ds-react';
import { Block, FormikFileUploader, Step, StepButtonWrapper, bemUtils, intlUtils } from '@navikt/fp-common';
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
import {
    getInitialSkjemaValuesFromState,
    getVedleggForTilrettelegging,
    mapTilretteleggingMedSkjema,
} from './skjemaFormUtils';
import { Link } from 'react-router-dom';
import { FieldArray } from 'formik';
import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';
import useSøknad from 'app/utils/hooks/useSøknad';
import './skjema.css';

const Skjema: React.FunctionComponent = () => {
    const intl = useIntl();
    const bem = bemUtils('skjema');
    const { state } = useSvangerskapspengerContext();
    const { tilrettelegging } = useSøknad();

    const flereTilrettelegginger = tilrettelegging.length > 1;
    const descriptionId = flereTilrettelegginger
        ? 'tilrettelegging.vedlegg.description.flereTilrettelegginger'
        : 'tilrettelegging.vedlegg.description.enTilrettelegging';
    const classVariant = flereTilrettelegginger ? 'List' : '';

    const onValidSubmitHandler = (values: Partial<SkjemaFormData>) => {
        const mappedTilrettelegging = mapTilretteleggingMedSkjema(tilrettelegging, values);
        const alleVedlegg = values.vedlegg ? values.vedlegg?.flat(1) : [];
        return [actionCreator.setVedlegg(alleVedlegg), actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };
    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.PERIODE);

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
                            <Block padBottom="xxl">
                                <Block padBottom="l">
                                    <Label>{intlUtils(intl, 'tilrettelegging.vedlegg.label')}</Label>
                                </Block>

                                <FormattedMessage
                                    id={descriptionId}
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
                            </Block>
                            {tilrettelegging.map((t: Tilrettelegging, index: number) => {
                                const key = t.id;
                                const skjemanummer =
                                    t.arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET
                                        ? Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING
                                        : Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG;
                                const vedleggForTilrettelegging = getVedleggForTilrettelegging(formValues, index);

                                return (
                                    <Block key={key}>
                                        {flereTilrettelegginger && (
                                            <div className={bem.element('arbeidsgiverNavn')}>
                                                <Label>{`${t.arbeidsforhold.navn}`}</Label>
                                            </div>
                                        )}
                                        <div className={bem.element(`arbeidsgiverBoks${classVariant}`)}>
                                            {vedleggForTilrettelegging && vedleggForTilrettelegging.length > 0 && (
                                                <AttachmentList
                                                    vedlegg={vedleggForTilrettelegging}
                                                    onDelete={(file: Attachment) => {
                                                        setFieldValue(
                                                            SkjemaFormField.vedlegg,
                                                            deleteAttachment(formValues.vedlegg!, index, file)
                                                        );
                                                    }}
                                                />
                                            )}
                                            <FieldArray
                                                validateOnChange={false}
                                                name={SkjemaFormField.vedlegg}
                                                render={() => {
                                                    return (
                                                        <div className={bem.element(`lastOppKnapp${classVariant}`)}>
                                                            <FormikFileUploader
                                                                key={`${SkjemaFormField.vedlegg}.${index}`}
                                                                name={`${SkjemaFormField.vedlegg}.${index}`}
                                                                buttonLabel={intlUtils(
                                                                    intl,
                                                                    'tilrettelegging.vedlegg.buttonLabel'
                                                                )}
                                                                legend=""
                                                                label={`Last opp dokument`}
                                                                attachments={getVedleggForTilrettelegging(
                                                                    formValues,
                                                                    index
                                                                )}
                                                                attachmentType={AttachmentType.TILRETTELEGGING}
                                                                skjemanummer={skjemanummer}
                                                                validateHasAttachment={true}
                                                            />
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </Block>
                                );
                            })}
                            <Block padBottom="l">
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
