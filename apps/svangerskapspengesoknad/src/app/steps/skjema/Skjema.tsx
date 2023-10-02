import { Alert, Button, Label, ReadMore } from '@navikt/ds-react';
import { Block, FormikFileUploader, Step, StepButtonWrapper, bemUtils, intlUtils } from '@navikt/fp-common';
import AttachmentList from 'app/components/attachment-list/AttachmentList';
import { useSvangerskapspengerContext } from 'app/context/hooks/useSvangerskapspengerContext';
import SøknadRoutes from 'app/routes/routes';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { FormattedMessage, useIntl } from 'react-intl';
import { SkjemaFormComponents, SkjemaFormData, SkjemaFormField } from './skjemaFormTypes';
import stepConfig, { getBackLinkForSkjemaSteg } from '../stepsConfig';
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
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import { useEffect, useState } from 'react';
import { getNesteTilretteleggingId } from 'app/routes/SvangerskapspengesøknadRoutes';
import useUpdateCurrentTilretteleggingId from 'app/utils/hooks/useUpdateCurrentTilretteleggingId';
import SkjemaopplastningTekstFrilansSN from './components/SkjemaopplastningTekstFrilansSN';
import SkjemaopplastningTekstArbeidsgiver from './components/SkjemaopplastningTekstArbeidsgiver';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import HorizontalLine from 'app/components/horizontal-line/HorizontalLine';

const MAX_ANTALL_VEDLEGG = 40;

const Skjema: React.FunctionComponent = () => {
    useUpdateCurrentTilretteleggingId(undefined);
    const intl = useIntl();
    const bem = bemUtils('skjema');
    const { arbeidsforhold } = useSøkerinfo();
    const { state } = useSvangerskapspengerContext();
    const { søker, barn, tilrettelegging } = useSøknad();
    const onAvbrytSøknad = useAvbrytSøknad();
    const [forMangeFiler, setForMangeFiler] = useState(false);
    const [submitClicked, setSubmitClicked] = useState(false);
    const flereTilrettelegginger = tilrettelegging.length > 1;
    const classVariant = flereTilrettelegginger ? 'List' : '';

    const onValidSubmitHandler = (values: Partial<SkjemaFormData>) => {
        const mappedTilrettelegging = mapTilretteleggingMedSkjema(tilrettelegging, values as SkjemaFormData);
        const alleVedlegg = values.vedlegg ? values.vedlegg?.flat(1) : [];
        return [actionCreator.setVedlegg(alleVedlegg), actionCreator.setTilrettelegging(mappedTilrettelegging)];
    };
    const førsteTilretteleggingId = getNesteTilretteleggingId(tilrettelegging, state.currentTilretteleggingId);

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        `${SøknadRoutes.TILRETTELEGGING}/${førsteTilretteleggingId}`,
    );

    const handleOnSubmit = (values: any) => {
        setSubmitClicked(true);

        if (!forMangeFiler) {
            handleSubmit(values);
        }
    };
    return (
        <SkjemaFormComponents.FormikWrapper
            initialValues={getInitialSkjemaValuesFromState(state)}
            onSubmit={handleOnSubmit}
            renderForm={({ values: formValues, setFieldValue }) => {
                const antallVedlegg = formValues.vedlegg?.flat(1).length || 0;
                useEffect(() => {
                    setForMangeFiler(antallVedlegg > MAX_ANTALL_VEDLEGG);
                }, [setForMangeFiler, antallVedlegg]);
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="skjema"
                        pageTitle={'Tilretteleggingskjema'}
                        onCancel={onAvbrytSøknad}
                        steps={stepConfig(intl)}
                    >
                        <SkjemaFormComponents.Form includeButtons={false} includeValidationSummary={true}>
                            {tilrettelegging.map((t: Tilrettelegging, index: number) => {
                                const key = t.id;
                                const skjemanummer =
                                    t.arbeidsforhold.type === Arbeidsforholdstype.VIRKSOMHET
                                        ? Skjemanummer.SKJEMA_FOR_TILRETTELEGGING_OG_OMPLASSERING
                                        : Skjemanummer.TILRETTELEGGING_FOR_FRILANS_ELLER_SELVSTENDIG;
                                const vedleggForTilrettelegging = getVedleggForTilrettelegging(formValues, index);
                                const erSNEllerFrilans =
                                    t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER ||
                                    t.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG;
                                const labelTekst =
                                    t.arbeidsforhold.type === Arbeidsforholdstype.FRILANSER
                                        ? intlUtils(intl, 'skjema.tittel.frilanser')
                                        : t.arbeidsforhold.navn;

                                return (
                                    <Block key={key}>
                                        {flereTilrettelegginger && (
                                            <div className={bem.element('headingBox')}>
                                                <Label className={bem.element('heading')}>{`${labelTekst}`}</Label>
                                            </div>
                                        )}
                                        <div className={bem.element(`arbeidsgiverBoks${classVariant}`)}>
                                            {erSNEllerFrilans && (
                                                <SkjemaopplastningTekstFrilansSN typeArbeid={t.arbeidsforhold.type} />
                                            )}

                                            {!erSNEllerFrilans && <SkjemaopplastningTekstArbeidsgiver />}
                                            {vedleggForTilrettelegging && vedleggForTilrettelegging.length > 0 && (
                                                <AttachmentList
                                                    vedlegg={vedleggForTilrettelegging}
                                                    onDelete={(file: Attachment) => {
                                                        setFieldValue(
                                                            SkjemaFormField.vedlegg,
                                                            deleteAttachment(formValues.vedlegg!, index, file),
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
                                                                    'skjema.vedlegg.buttonLabel',
                                                                )}
                                                                legend=""
                                                                label={`Last opp dokument`}
                                                                attachments={getVedleggForTilrettelegging(
                                                                    formValues,
                                                                    index,
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
                                        {index !== tilrettelegging.length - 1 && <HorizontalLine />}
                                    </Block>
                                );
                            })}
                            <Block padBottom="xxl">
                                <ReadMore header={'Les om hvordan ta et bra bilde'}>
                                    <div>TODO</div>
                                </ReadMore>
                            </Block>
                            {forMangeFiler && submitClicked && (
                                <Alert variant="error">{intlUtils(intl, 'skjema.maks40Filer')}</Alert>
                            )}
                            <Block padBottom="l">
                                <StepButtonWrapper>
                                    <Button
                                        variant="secondary"
                                        as={Link}
                                        to={getBackLinkForSkjemaSteg(søker, barn.termindato, arbeidsforhold)}
                                    >
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
