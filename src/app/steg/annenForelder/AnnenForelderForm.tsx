import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import {
    AnnenForelderFormValues,
    AnnenForelderFormComponents,
    AnnenForelderFieldNames
} from './form/annenforelderFormTypes';
import { commonFieldErrorRenderer } from '../utenlandsopphold/bostedUtlandListAndDialog/BostedUtlandForm';
import OppgiPersonalia from './oppgi-personalia/OppgiPersonalia';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { annenForelderFormQuestions } from './form/annenForelderFormQuestions';
import { SøkerRolle, Skjemanummer } from 'app/types/søknad/Søknad';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import AttachmentsUploaderPure from 'app/components/storage/attachment/components/AttachmentUploaderPure';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import Barn from 'app/types/søknad/Barn';

interface Props {
    intl: InjectedIntl;
    skalOppgiPersonalia: boolean;
    søkerRolle: SøkerRolle;
    gjelderStebarnsadopsjon: boolean;
    familiehendelseDato: Date | undefined;
    barn: Barn;
    initialFormValues: AnnenForelderFormValues;
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
    initialFormValues,
    onFilesSelect,
    onFileDelete,
    intl
}) => {
    return (
        <AnnenForelderFormComponents.FormikWrapper
            initialValues={initialFormValues}
            onSubmit={(values: AnnenForelderFormValues) => onValidSubmit(values)}
            renderForm={({ values: formValues }) => {
                const visibility = annenForelderFormQuestions.getVisbility({
                    ...formValues,
                    skalOppgiPersonalia,
                    søkerRolle,
                    gjelderStebarnsadopsjon
                });
                return (
                    <AnnenForelderFormComponents.Form
                        includeButtons={true}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        includeValidationSummary={true}
                        submitButtonLabel="Fortsett"
                        runDelayedFormValidation={true}
                    >
                        {skalOppgiPersonalia && (
                            <OppgiPersonalia
                                fornavn={formValues.fornavn}
                                erUtenlandskFnr={formValues.utenlandskFnr}
                                kanIkkeOppgis={formValues.kanIkkeOppgis}
                                visibility={visibility}
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
                            />
                        </Block>
                        <Block visible={visibility.isVisible(AnnenForelderFieldNames.datoForAleneomsorg)}>
                            <Block>
                                <AnnenForelderFormComponents.DatePicker
                                    name={AnnenForelderFieldNames.datoForAleneomsorg}
                                    label={getMessage(intl, 'datoForAleneomsorg.spørsmål')}
                                    dateLimitations={{ minDato: familiehendelseDato }}
                                />
                            </Block>

                            <Block margin="xs">
                                <VeilederInfo
                                    messages={[
                                        {
                                            type: 'normal',
                                            contentIntlKey: 'far.dokumantasjonAvAleneomsorg.vedlegg.veileder'
                                        }
                                    ]}
                                />
                            </Block>

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
                                legend={getMessage(intl, 'annenForelderRettPåForeldrepenger.spørsmål', {
                                    navn: formValues.fornavn
                                })}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(AnnenForelderFieldNames.erInformertOmSøknaden)}>
                            <AnnenForelderFormComponents.YesOrNoQuestion
                                name={AnnenForelderFieldNames.erInformertOmSøknaden}
                                legend={getMessage(intl, 'erAnnenForelderInformert.spørsmål', {
                                    navn: formValues.fornavn
                                })}
                            />
                        </Block>
                        <Block visible={visibility.isVisible(AnnenForelderFieldNames.erMorUfør)}>
                            <AnnenForelderFormComponents.YesOrNoQuestion
                                name={AnnenForelderFieldNames.erMorUfør}
                                legend={getMessage(intl, 'erMorUfør.spørsmål', {
                                    navn: formValues.fornavn
                                })}
                            />
                        </Block>
                    </AnnenForelderFormComponents.Form>
                );
            }}
        />
    );
};

export default injectIntl(AnnenForelderForm);
