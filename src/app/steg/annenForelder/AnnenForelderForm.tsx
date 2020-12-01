import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    AnnenForelderFormValues,
    AnnenForelderFormComponents,
    AnnenForelderFieldNames,
} from './form/annenforelderFormTypes';
import OppgiPersonalia from './oppgi-personalia/OppgiPersonalia';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { annenForelderFormQuestions } from './form/annenForelderFormQuestions';
import { SøkerRolle, Skjemanummer } from 'app/types/søknad/Søknad';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import Barn from 'app/types/søknad/Barn';
import {
    validateYesOrNoIsAnswered,
    validateRequiredField,
    validateAnnenForelderInformert,
    commonFieldErrorRenderer,
} from 'app/validation/fieldValidations';
import AvtaleAtFarTarUtForeldrepengerVeileder from './veiledere/AvtaleAtFarTarUtForeldrepengerVeileder';
import { getErSøkerFarEllerMedmor } from 'app/util/domain/personUtil';
import { UnansweredQuestionsInfo, YesOrNo } from '@navikt/sif-common-formik/lib';
import MåOrientereAnnenForelderVeileder from './veiledere/MåOrientereAnnenForelderVeileder';
import FarDokumentasjonAleneomsorgVeileder from './veiledere/FarDokumentasjonAleneomsorgVeileder';

interface Props {
    skalOppgiPersonalia: boolean;
    søkerRolle: SøkerRolle;
    gjelderStebarnsadopsjon: boolean;
    familiehendelseDato: Date | undefined;
    barn: Barn;
    initialFormValues: AnnenForelderFormValues;
    gjelderAdopsjon: boolean;
    søkersFødselsnummer: string;
    onValidSubmit: (values: AnnenForelderFormValues) => void;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

const AnnenForelderForm: React.FunctionComponent<Props> = ({
    onValidSubmit,
    skalOppgiPersonalia,
    søkerRolle,
    gjelderStebarnsadopsjon,
    familiehendelseDato,
    barn,
    gjelderAdopsjon,
    søkersFødselsnummer,
    initialFormValues,
    onFilesSelect,
    onFileDelete,
}) => {
    const intl = useIntl();

    return (
        <AnnenForelderFormComponents.FormikWrapper
            initialValues={initialFormValues}
            onSubmit={(values: AnnenForelderFormValues) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = annenForelderFormQuestions.getVisbility({
                    ...formValues,
                    skalOppgiPersonalia,
                    søkerRolle,
                    gjelderStebarnsadopsjon,
                });
                const allQuestionsAnswered = visibility.areAllQuestionsAnswered();
                return (
                    <AnnenForelderFormComponents.Form
                        includeButtons={allQuestionsAnswered}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        includeValidationSummary={true}
                        submitButtonLabel="Fortsett"
                        runDelayedFormValidation={true}
                        noButtonsContentRenderer={
                            allQuestionsAnswered
                                ? undefined
                                : () => (
                                      <UnansweredQuestionsInfo>
                                          {getMessage(intl, 'steg.footer.spørsmålMåBesvares')}
                                      </UnansweredQuestionsInfo>
                                  )
                        }
                    >
                        {skalOppgiPersonalia && (
                            <OppgiPersonalia
                                fornavn={formValues.fornavn}
                                erUtenlandskFnr={formValues.utenlandskFnr}
                                kanIkkeOppgis={formValues.kanIkkeOppgis}
                                visibility={visibility}
                                gjelderAdopsjon={gjelderAdopsjon}
                                søkersFødselsnummer={søkersFødselsnummer}
                            />
                        )}
                        <Block
                            visible={
                                visibility.isVisible(AnnenForelderFieldNames.aleneOmOmsorg) || !skalOppgiPersonalia
                            }
                        >
                            <AnnenForelderFormComponents.YesOrNoQuestion
                                name={AnnenForelderFieldNames.aleneOmOmsorg}
                                info={getMessage(intl, 'annenForelder.aleneOmOmsorg.veileder')}
                                legend={getMessage(intl, 'annenForelder.aleneOmOmsorg')}
                                validate={(erAleneOmOmsorg) =>
                                    validateYesOrNoIsAnswered(erAleneOmOmsorg, 'valideringsfeil.aleneOmOmsorgPåkrevd')
                                }
                            />
                            <AvtaleAtFarTarUtForeldrepengerVeileder
                                visible={
                                    !getErSøkerFarEllerMedmor(søkerRolle) && formValues.aleneOmOmsorg === YesOrNo.YES
                                }
                                annenForelderNavn={formValues.fornavn}
                            />
                        </Block>

                        <Block visible={visibility.isVisible(AnnenForelderFieldNames.datoForAleneomsorg)}>
                            <Block>
                                <AnnenForelderFormComponents.DatePicker
                                    name={AnnenForelderFieldNames.datoForAleneomsorg}
                                    label={getMessage(intl, 'datoForAleneomsorg.spørsmål')}
                                    minDate={familiehendelseDato}
                                    validate={validateRequiredField}
                                />
                            </Block>

                            <FarDokumentasjonAleneomsorgVeileder />

                            <AttachmentsUploaderPure
                                attachments={barn.dokumentasjonAvAleneomsorg || []}
                                attachmentType={AttachmentType.ALENEOMSORG}
                                onFilesSelect={onFilesSelect}
                                onFileDelete={onFileDelete}
                                skjemanummer={Skjemanummer.DOK_AV_ALENEOMSORG}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(AnnenForelderFieldNames.harRettPåForeldrepenger)}>
                            <AnnenForelderFormComponents.YesOrNoQuestion
                                name={AnnenForelderFieldNames.harRettPåForeldrepenger}
                                info={
                                    <>
                                        <FormattedMessage
                                            id="annenForelderRettPåForeldrepenger.veileder.del1"
                                            values={{ navn: formValues.fornavn }}
                                        ></FormattedMessage>
                                        <br />
                                        <FormattedMessage
                                            id="annenForelderRettPåForeldrepenger.veileder.del2"
                                            values={{ navn: formValues.fornavn }}
                                        ></FormattedMessage>
                                    </>
                                }
                                legend={getMessage(intl, 'annenForelderRettPåForeldrepenger.spørsmål', {
                                    navn: formValues.fornavn,
                                })}
                                validate={(annenForelderHarRett) =>
                                    validateYesOrNoIsAnswered(
                                        annenForelderHarRett,
                                        'valideringsfeil.annenForelderHarRettPåkrevd'
                                    )
                                }
                            />
                        </Block>
                        <Block visible={visibility.isVisible(AnnenForelderFieldNames.erInformertOmSøknaden)}>
                            <AnnenForelderFormComponents.YesOrNoQuestion
                                name={AnnenForelderFieldNames.erInformertOmSøknaden}
                                legend={getMessage(intl, 'erAnnenForelderInformert.spørsmål', {
                                    navn: formValues.fornavn,
                                })}
                                validate={(value) => validateAnnenForelderInformert(value, formValues.fornavn)}
                            />
                            <MåOrientereAnnenForelderVeileder
                                visible={formValues.erInformertOmSøknaden === YesOrNo.NO}
                                annenForelderNavn={formValues.fornavn}
                            />
                        </Block>

                        <Block visible={visibility.isVisible(AnnenForelderFieldNames.erMorUfør)}>
                            <AnnenForelderFormComponents.YesOrNoQuestion
                                name={AnnenForelderFieldNames.erMorUfør}
                                legend={getMessage(intl, 'erMorUfør.spørsmål', {
                                    navn: formValues.fornavn,
                                })}
                                validate={(erMorUfør) =>
                                    validateYesOrNoIsAnswered(erMorUfør, 'valideringsfeil.erMorUførPåkrevd')
                                }
                            />
                        </Block>
                    </AnnenForelderFormComponents.Form>
                );
            }}
        />
    );
};

export default AnnenForelderForm;
