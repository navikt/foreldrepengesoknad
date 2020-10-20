import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Systemtittel } from 'nav-frontend-typografi';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { dateRangeValidation } from 'app/util/dates/dates';
import { commonFieldErrorRenderer, validateRequiredField } from 'app/validation/fieldValidations';
import { BostedUtland, isValidBostedUtland } from './types';
import { DatoInputVerdi } from '../../../../common/components/skjema/elements/dato-input/DatoInput';
import { createDatoInputVerdi } from '../../../../common/components/skjema/elements/dato-input/datoInputUtils';

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
    [BostedUtlandFormFields.fom]: DatoInputVerdi;
    [BostedUtlandFormFields.tom]: DatoInputVerdi;
    [BostedUtlandFormFields.landkode]: string;
}>;

const Form = getTypedFormComponents<BostedUtlandFormFields, FormValues>();

const mapBostedToFormValues = (bosted: BostedUtland): FormValues => {
    return {
        fom: createDatoInputVerdi(bosted.fom),
        tom: createDatoInputVerdi(bosted.tom),
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
            fom: formValues.fom?.date,
            tom: formValues.tom?.date,
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
            renderForm={(formik) => {
                const { values } = formik;
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
                                    minDate,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                    maxDate: values.tom?.date || maxDate,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDate(
                                            value?.date,
                                            minDate,
                                            maxDate,
                                            values.tom?.date
                                        ),
                                }}
                                toDatepickerProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: getMessage(intl, 'tilogmed'),
                                    fullscreenOverlay: true,
                                    minDate: values.fom?.date || minDate,
                                    maxDate,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                    validate: (value) =>
                                        dateRangeValidation.validateToDate(
                                            value?.date,
                                            minDate,
                                            maxDate,
                                            values.fom?.date
                                        ),
                                }}
                            />
                        </Block>
                        <Block>
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
                    </Form.Form>
                );
            }}
        />
    );
};

export default BostedUtlandForm;
