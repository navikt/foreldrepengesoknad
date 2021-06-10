import { Block, intlUtils } from '@navikt/fp-common';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import VeilederNormal from 'app/assets/VeilederNormal';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import Søkersituasjon from 'app/context/types/Søkersituasjon';
import { AttachmentType } from 'app/types/AttachmentType';
import { Skjemanummer } from 'app/types/Skjemanummer';
import dayjs from 'dayjs';
import { FieldArray } from 'formik';
import Veilederpanel from 'nav-frontend-veilederpanel';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import {
    validateAdopsjonsdato,
    validateAnkomstdato,
    validateFødselsdatoAdopsjon,
} from '../validation/omBarnetValidering';

interface Props {
    søkersituasjon: Søkersituasjon;
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
}

const AdopsjonAnnetBarn: FunctionComponent<Props> = ({ søkersituasjon, formValues, visibility }) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon === 'fødsel' || formValues.adopsjonAvEktefellesBarn !== YesOrNo.NO) {
        return null;
    }

    return (
        <>
            <Block padBottom="l">
                <OmBarnetFormComponents.DatePicker
                    label={intlUtils(intl, 'omBarnet.adopsjonsdato.annetBarn')}
                    name={OmBarnetFormField.adopsjonsdato}
                    validate={validateAdopsjonsdato(intl)}
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
                    legend={intlUtils(intl, 'omBarnet.antallBarn.født')}
                />
            </Block>
            <Block
                padBottom="l"
                visible={formValues.antallBarn !== undefined && parseInt(formValues.antallBarn, 10) >= 3}
            >
                <OmBarnetFormComponents.Select name={OmBarnetFormField.antallBarn}>
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
                    render={() => [
                        <OmBarnetFormComponents.DatePicker
                            key={`${OmBarnetFormField.fødselsdatoer}.0`}
                            name={`${OmBarnetFormField.fødselsdatoer}.0` as OmBarnetFormField}
                            label={intlUtils(intl, 'omBarnet.fødselsdato')}
                            minDate={dayjs(formValues.adopsjonsdato).subtract(15, 'years').toDate()}
                            maxDate={dayjs().toDate()}
                            validate={(value) => validateFødselsdatoAdopsjon(intl)(value, formValues.adopsjonsdato)}
                            placeholder={'dd.mm.åååå'}
                            showYearSelector={true}
                        />,
                    ]}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.adoptertIUtlandet)}>
                <OmBarnetFormComponents.YesOrNoQuestion
                    name={OmBarnetFormField.adoptertIUtlandet}
                    legend={intlUtils(intl, 'omBarnet.adopteresFraUtlandet')}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.ankomstdato)}>
                <OmBarnetFormComponents.DatePicker
                    name={OmBarnetFormField.ankomstdato}
                    label={intlUtils(intl, 'omBarnet.ankomstDato')}
                    minDate={dayjs(formValues.fødselsdatoer[0]).toDate()}
                    maxDate={dayjs().add(6, 'months').toDate()}
                    validate={(value) => validateAnkomstdato(intl)(value, formValues.fødselsdatoer[0])}
                    placeholder={'dd.mm.åååå'}
                />
            </Block>
            <Block padBottom="l" visible={visibility.isVisible(OmBarnetFormField.omsorgsovertakelse)}>
                <Veilederpanel fargetema="normal" svg={<VeilederNormal transparentBackground={true} />}>
                    <FormattedMessage id="omBarnet.veileder.omsorgsovertakelse.annetBarn" />
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

export default AdopsjonAnnetBarn;
