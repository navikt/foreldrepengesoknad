import { Block, ISOStringToDate, Søkersituasjon, guid, intlUtils } from '@navikt/fp-common';
import { QuestionVisibility } from '@navikt/sif-common-question-config/lib';
import FormikFileUploader from 'app/components/formik-file-uploader/FormikFileUploader';
import dayjs from 'dayjs';
import { FieldArray } from 'formik';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { OmBarnetFormComponents, OmBarnetFormData, OmBarnetFormField } from '../omBarnetFormConfig';
import { validateAdopsjonsdato, validateFødselsdatoAdopsjon } from '../validation/omBarnetValidering';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    søkersituasjon: Søkersituasjon;
    formValues: OmBarnetFormData;
    visibility: QuestionVisibility<OmBarnetFormField, undefined>;
    søknadGjelderEtNyttBarn: boolean;
}

const AdopsjonEktefellesBarn: FunctionComponent<Props> = ({
    søkersituasjon,
    formValues,
    visibility,
    søknadGjelderEtNyttBarn,
}) => {
    const intl = useIntl();

    if (søkersituasjon.situasjon === 'fødsel' || formValues.adopsjonAvEktefellesBarn !== YesOrNo.YES) {
        return null;
    }

    return (
        <>
            <Block padBottom="xl">
                <OmBarnetFormComponents.DatePicker
                    label={intlUtils(intl, 'omBarnet.adopsjonsdato.stebarn')}
                    name={OmBarnetFormField.adopsjonsdato}
                    validate={validateAdopsjonsdato(intl)}
                    placeholder={'dd.mm.åååå'}
                />
            </Block>
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.antallBarn)}>
                <OmBarnetFormComponents.RadioGroup
                    name={OmBarnetFormField.antallBarn}
                    radios={[
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.ettBarn'),
                            value: '1',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.toBarn'),
                            value: '2',
                        },
                        {
                            label: intlUtils(intl, 'omBarnet.radiobutton.flere'),
                            value: '3',
                        },
                    ]}
                    legend={intlUtils(intl, 'omBarnet.antallBarn.adopsjon.født')}
                />
            </Block>
            <Block
                padBottom="xl"
                visible={
                    formValues.antallBarn !== undefined &&
                    søknadGjelderEtNyttBarn &&
                    parseInt(formValues.antallBarn, 10) >= 3
                }
            >
                <OmBarnetFormComponents.Select label="Antall barn" name={OmBarnetFormField.antallBarnSelect}>
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
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.fødselsdatoer)}>
                <FieldArray
                    name={OmBarnetFormField.fødselsdatoer}
                    render={() =>
                        [...Array(parseInt(formValues.antallBarn!, 10))].map((_, index) => {
                            return (
                                <Block key={guid()} padBottom="xl">
                                    <OmBarnetFormComponents.DatePicker
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
            <Block padBottom="xl" visible={visibility.isVisible(OmBarnetFormField.omsorgsovertakelse)}>
                <Block padBottom="xl">
                    <Heading level="3" size="xsmall">
                        {intlUtils(intl, 'omBarnet.tittel.omsorgsovertakelse')}
                    </Heading>
                    <BodyShort> {intlUtils(intl, 'omBarnet.veileder.omsorgsovertakelse')}</BodyShort>
                </Block>{' '}
                <FormikFileUploader
                    legend=""
                    label={intlUtils(intl, 'omBarnet.adopsjon.vedlegg')}
                    name={OmBarnetFormField.omsorgsovertakelse}
                    attachments={formValues.omsorgsovertakelse || []}
                    attachmentType={AttachmentType.OMSORGSOVERTAKELSE}
                    skjemanummer={Skjemanummer.OMSORGSOVERTAKELSE}
                />
            </Block>
        </>
    );
};

export default AdopsjonEktefellesBarn;
