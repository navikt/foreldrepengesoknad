import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { dateToISOString, getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Systemtittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { dateRangeValidation } from 'app/util/dates/dates';
import { commonFieldErrorRenderer, validateRequiredField } from 'app/validation/fieldValidations';
import { BostedUtland, isValidBostedUtland } from './types';

export interface BostedUtlandFormLabels {
    tittel: string;
}

interface Props {
    minDate: Date;
    maxDate: Date;
    bosted?: BostedUtland;
    onSubmit: (values: BostedUtland) => void;
    onCancel: () => void;
    erFremtidigOpphold: boolean;
}

enum BostedUtlandFormFields {
    fom = 'fom',
    tom = 'tom',
    landkode = 'landkode',
}

type FormValues = Partial<{
    [BostedUtlandFormFields.fom]: string;
    [BostedUtlandFormFields.tom]: string;
    [BostedUtlandFormFields.landkode]: string;
}>;

const Form = getTypedFormComponents<BostedUtlandFormFields, FormValues>();

const mapBostedToFormValues = (bosted: BostedUtland): FormValues => {
    return {
        fom: dateToISOString(bosted.fom),
        tom: dateToISOString(bosted.tom),
        landkode: bosted.landkode,
    };
};

const BostedUtlandForm: React.FunctionComponent<Props> = ({
    maxDate,
    minDate,
    bosted,
    onSubmit,
    onCancel,
    erFremtidigOpphold,
}) => {
    const intl = useIntl();
    const onFormikSubmit = (formValues: FormValues) => {
        const updatedBosted: Partial<BostedUtland> = {
            ...bosted,
            fom: ISOStringToDate(formValues.fom),
            tom: ISOStringToDate(formValues.tom),
            landkode: formValues.landkode,
        };
        if (isValidBostedUtland(updatedBosted)) {
            onSubmit(updatedBosted);
        } else {
            throw new Error('BostedUtlandForm: Formvalues is not a valid BostedUtland on submit.');
        }
    };

    return (
        <Form.FormikWrapper
            initialValues={bosted ? mapBostedToFormValues(bosted) : {}}
            onSubmit={onFormikSubmit}
            renderForm={({ values }) => {
                return (
                    <Form.Form
                        onCancel={onCancel}
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                    >
                        <Systemtittel tag="h1">
                            <FormattedMessage id="utenlandsopphold.tittel" />
                        </Systemtittel>
                        <Block>
                            <Form.DateIntervalPicker
                                legend="Tidsrom"
                                fromDatepickerProps={{
                                    name: BostedUtlandFormFields.fom,
                                    label: getMessage(intl, 'fraogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato.fom',
                                    maxDate: ISOStringToDate(values.tom) || maxDate,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDate(
                                            ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            ISOStringToDate(values.tom)
                                        ),
                                }}
                                toDatepickerProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: getMessage(intl, 'tilogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate: ISOStringToDate(values.fom) || minDate,
                                    maxDate,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato.tom',
                                    validate: (value) =>
                                        dateRangeValidation.validateToDate(
                                            ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            ISOStringToDate(values.fom)
                                        ),
                                }}
                            />
                        </Block>
                        <Block margin="xs">
                            <Form.CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label={
                                    erFremtidigOpphold
                                        ? getMessage(intl, 'utenlandsopphold.select.spørsmål.senereOpphold')
                                        : getMessage(intl, 'utenlandsopphold.select.spørsmål.tidligereOpphold')
                                }
                                validate={(country) =>
                                    validateRequiredField(country, 'valideringsfeil.utenlandsopphold.landPåkrevd')
                                }
                                useAlpha3Code={false}
                            />
                        </Block>
                        <Block margin="none">{getMessage(intl, 'utenlandsopphold.måFyllesUt')}</Block>
                    </Form.Form>
                );
            }}
        />
    );
};

export default BostedUtlandForm;
