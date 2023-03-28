import React from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik-ds/lib';
import getMessage from 'common/util/i18nUtils';
import { BostedUtland, isValidBostedUtland } from './types';
import { Block, intlUtils } from '@navikt/fp-common';
import { dateRangeValidation } from '../utenlandsoppholdValidering';
import { Heading } from '@navikt/ds-react';

export const commonFieldErrorRenderer = (intl: IntlShape, error: any): any => {
    if (typeof error === 'object' && error.key !== undefined) {
        return intl.formatMessage({ id: error.key }, error.values);
    }
    if (typeof error === 'string') {
        return error;
    }
    return error !== undefined;
};

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
        fom: bosted.fom,
        tom: bosted.tom,
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
            fom: formValues.fom,
            tom: formValues.tom,
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
                    <Form.Form onCancel={onCancel}>
                        <Heading size="medium">
                            <FormattedMessage id={'utenlandsopphold.leggTilUtenlandsopphold.tittel'} />
                        </Heading>
                        <Block>
                            <Form.DateIntervalPicker
                                legend={getMessage(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tidsrom')}
                                fromDatepickerProps={{
                                    name: BostedUtlandFormFields.fom,
                                    label: getMessage(intl, 'utenlandsopphold.leggTilUtenlandsopphold.fraogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate,
                                    invalidFormatError: 'valideringsfeil.fraOgMedDato.gyldigDato',
                                    maxDate: ISOStringToDate(values.tom) || maxDate,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDate(
                                            intl,
                                            ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            ISOStringToDate(values.tom)
                                        ),
                                }}
                                toDatepickerProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: getMessage(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tilogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate: ISOStringToDate(values.fom) || minDate,
                                    maxDate,
                                    invalidFormatError: 'valideringsfeil.tilOgMedDato.gyldigDato',
                                    validate: (value) =>
                                        dateRangeValidation.validateToDate(
                                            intl,
                                            ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            ISOStringToDate(values.fom)
                                        ),
                                }}
                            />
                        </Block>
                        <Block margin="xl">
                            <Form.CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label={
                                    erFremtidigOpphold
                                        ? getMessage(
                                              intl,
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI'
                                          )
                                        : getMessage(
                                              intl,
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandHarDuBoddI'
                                          )
                                }
                                validate={(country) => {
                                    if (country === '' || !country) {
                                        return erFremtidigOpphold
                                            ? intlUtils(
                                                  intl,
                                                  'valideringsfeil.leggTilUtenlandsopphold.landDuSkalBoIPåkreved'
                                              )
                                            : intlUtils(
                                                  intl,
                                                  'valideringsfeil.leggTilUtenlandsopphold.landDuHarBoddIPåkrevd'
                                              );
                                    }
                                }}
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
