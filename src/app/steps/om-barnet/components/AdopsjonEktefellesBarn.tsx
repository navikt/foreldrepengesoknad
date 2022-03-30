import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import { ISOStringToDate } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { FieldArray } from 'formik';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateAdopsjonsdato, validateFødselsdatoAdopsjon } from '../validation/omBarnetValidering';

interface Props {
    søkersituasjon: Søkersituasjon;
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const AdopsjonEktefellesBarn: FunctionComponent<Props> = ({ søkersituasjon, formValues, visibility }) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon === 'fødsel' || formValues.adopsjonAvEktefellesBarn !== YesOrNo.YES) {
        return null;
    }

    return (
        <>
            <Block padBottom="l">
                <OmBarnetFormComponents.DatePicker
                    label={intlUtils(intl, 'omBarnet.adopsjonsdato.stebarn')}
                    name={OmBarnetFormField.adopsjonsdato}
                    validate={validateAdopsjonsdato(intl)}
                    placeholder={'dd.mm.åååå'}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.antallBarn)}>
                <OmBarnetFormComponents.RadioPanelGroup
                    name={OmBarnetFormField.antallBarn}
                    radios={[
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.ettBarn'),
                            value: '1',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.tvillinger'),
                            value: '2',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.flere'),
                            value: '3',
                        },
                    ]}
                    useTwoColumns={true}
                    legend={intlUtils(intl, 'omBarnet.antallBarn.adopsjon.født')}
                />
            </Block>
            <Block
                padBottom="l"
                visible={formValues.antallBarn !== undefined && parseInt(formValues.antallBarn, 10) >= 3}
            >
                <OmBarnetFormComponents.Select name={OmBarnetFormField.antallBarnSelect}>
                    <option value="" />
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                </OmBarnetFormComponents.Select>
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.fødselsdatoer)}>
                <FieldArray
                    name={OmBarnetFormField.fødselsdatoer}
                    render={() =>
                        [...Array(parseInt(formValues.antallBarn!, 10))].map((_, index) => {
                            return (
                                <Block key={index} padBottom="l">
                                    <OmBarnetFormComponents.DatePicker
                                        key={`${OmBarnetFormField.fødselsdatoer}.${index}`}
                                        name={
                                            `${OmBarnetFormField.fødselsdatoer}.${index}` as unknown as OmBarnetFormField
                                        }
                                        label={
                                            formValues.antallBarn === '1'
                                                ? intlUtils(intl, 'omBarnet.fødselsdato')
                                                : intlUtils(intl, `omBarnet.fødselsdato.adopsjon.${index + 1}`)
                                        }
                                        minDate={dayjs().subtract(6, 'month').toDate()}
                                        maxDate={ISOStringToDate(formValues.adopsjonsdato)}
                                        validate={(value) =>
                                            validateFødselsdatoAdopsjon(intl)(value, formValues.adopsjonsdato)
                                        }
                                        placeholder={'dd.mm.åååå'}
                                    />{' '}
                                </Block>
                            );
                        })
                    }
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.omsorgsovertakelse)}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage id="omBarnet.veileder.omsorgsovertakelse.stebarn" />
                </Veilederpanel>
            </Block>
            <Block visible={visibility.isVisible(OmBarnetFormField.omsorgsovertakelse)}>
                <FormikFileUploader
                    label={intlUtils(intl, 'omBarnet.adopsjon.vedlegg')}
                    name={OmBarnetFormField.omsorgsovertakelse}
                    attachments={formValues.omsorgsovertakelse || []}
                    attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                    skjemanummer={Skjemanummer.OMSORGSOVERTAKELSESDATO}
                />
            </Block>
        </>
    );
};

export default AdopsjonEktefellesBarn;
