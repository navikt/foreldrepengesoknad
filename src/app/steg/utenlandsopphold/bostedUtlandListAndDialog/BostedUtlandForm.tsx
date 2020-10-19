import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import { Systemtittel } from 'nav-frontend-typografi';
import { BostedUtland, isValidBostedUtland } from './types';
import getMessage from 'common/util/i18nUtils';
import { dateRangeValidation } from 'app/util/dates/dates';
import { commonFieldErrorRenderer, validateRequiredField } from 'app/validation/fieldValidations';
import Block from 'common/components/block/Block';

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

type FormValues = Partial<BostedUtland>;

const Form = getTypedFormComponents<BostedUtlandFormFields, FormValues>();

const BostedUtlandForm: React.FunctionComponent<Props> = ({
    maxDate,
    minDate,
    bosted,
    onSubmit,
    onCancel,
    erFremtidigOpphold,
}) => {
    const intl = useIntl();
    const onFormikSubmit = (formValues: Partial<BostedUtland>) => {
        if (isValidBostedUtland(formValues)) {
            onSubmit(formValues);
        } else {
            throw new Error('BostedUtlandForm: Formvalues is not a valid BostedUtland on submit.');
        }
    };

    return (
        <Form.FormikWrapper
            initialValues={bosted || {}}
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
                                    maxDate: values.tom || maxDate,
                                    validate: (date: Date) =>
                                        dateRangeValidation.validateFromDate(date, minDate, maxDate, values.tom),
                                }}
                                toDatepickerProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: getMessage(intl, 'tilogmed'),
                                    fullscreenOverlay: true,
                                    minDate: values.fom || minDate,
                                    maxDate,
                                    validate: (date: Date) =>
                                        dateRangeValidation.validateToDate(date, minDate, maxDate, values.fom),
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
