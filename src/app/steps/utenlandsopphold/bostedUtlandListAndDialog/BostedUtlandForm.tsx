import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { Systemtittel } from 'nav-frontend-typografi';
import { BostedUtland, isValidBostedUtland } from './types';
import { Block, intlUtils, validateRequiredField } from '@navikt/fp-common';
import { dateRangeValidation } from 'app/utils/dateUtils';

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

const Form = getTypedFormComponents<BostedUtlandFormFields, FormValues, string>();

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
                        <Systemtittel tag="h1">
                            <FormattedMessage id={'utenlandsopphold.leggTilUtenlandsopphold.tittel'} />
                        </Systemtittel>
                        <Block>
                            <Form.DateIntervalPicker
                                legend={intlUtils(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tidsrom')}
                                fromDatepickerProps={{
                                    name: BostedUtlandFormFields.fom,
                                    label: intlUtils(intl, 'utenlandsopphold.leggTilUtenlandsopphold.fraogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate,
                                    maxDate: ISOStringToDate(values.tom) || maxDate,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDateInRange({
                                            intl,
                                            date: ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            errorKey: 'valideringsfeil.fraOgMedDato.førTilDato',
                                            toDate: ISOStringToDate(values.tom),
                                            disableWeekend: false,
                                        }),
                                }}
                                toDatepickerProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: intlUtils(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tilogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate: ISOStringToDate(values.fom) || minDate,
                                    maxDate,
                                    validate: (value) =>
                                        dateRangeValidation.validateToDateInRange({
                                            intl,
                                            date: ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                                            fromDate: ISOStringToDate(values.fom),
                                            disableWeekend: false,
                                        }),
                                }}
                            />
                        </Block>
                        <Block margin="xl">
                            <Form.CountrySelect
                                name={BostedUtlandFormFields.landkode}
                                label={
                                    erFremtidigOpphold
                                        ? intlUtils(
                                              intl,
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI'
                                          )
                                        : intlUtils(
                                              intl,
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandHarDuBoddI'
                                          )
                                }
                                validate={(country) =>
                                    validateRequiredField(
                                        country,
                                        intlUtils(
                                            intl,
                                            erFremtidigOpphold
                                                ? 'valideringsfeil.utenlandsopphold.landDuSkalBoIPåkrevd'
                                                : 'valideringsfeil.utenlandsopphold.landDuHarBoddIPåkrevd'
                                        )
                                    )
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
