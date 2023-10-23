import { FormattedMessage, useIntl } from 'react-intl';
import { BostedUtland, isValidBostedUtland } from './types';
import { Block, intlUtils, validateRequiredField } from '@navikt/fp-common';
import { dateRangeValidation, ISOStringToDate } from 'app/utils/dateUtils';
import dayjs from 'dayjs';
import { Heading } from '@navikt/ds-react';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';

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
                    <Form.Form onCancel={onCancel} showButtonArrows={false} submitButtonLabel="Legg til">
                        <Heading size="medium" as="h1">
                            <FormattedMessage id={'utenlandsopphold.leggTilUtenlandsopphold.tittel'} />
                        </Heading>
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
                                    validate: (value) => {
                                        if (values.tom && values.fom && dayjs(values.tom).isSame(values.fom)) {
                                            return 'Fra og med dato kan ikke være samme som til og med dato';
                                        }

                                        return dateRangeValidation.validateFromDateInRange({
                                            intl,
                                            date: ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            errorKey: 'valideringsfeil.fraOgMedDato.førTilDato',
                                            toDate: ISOStringToDate(values.tom),
                                            disableWeekend: false,
                                        });
                                    },
                                }}
                                toDatepickerProps={{
                                    name: BostedUtlandFormFields.tom,
                                    label: intlUtils(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tilogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate: ISOStringToDate(values.fom) || minDate,
                                    maxDate,
                                    validate: (value) => {
                                        if (values.tom && values.fom && dayjs(values.tom).isSame(values.fom)) {
                                            return 'Til og med dato kan ikke være samme som fra og med dato';
                                        }

                                        return dateRangeValidation.validateToDateInRange({
                                            intl,
                                            date: ISOStringToDate(value),
                                            minDate,
                                            maxDate,
                                            errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                                            fromDate: ISOStringToDate(values.fom),
                                            disableWeekend: false,
                                        });
                                    },
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
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandSkalDuBoI',
                                          )
                                        : intlUtils(
                                              intl,
                                              'utenlandsopphold.leggTilUtenlandsopphold.spørsmål.hvilketLandHarDuBoddI',
                                          )
                                }
                                validate={(country) =>
                                    validateRequiredField(
                                        country,
                                        intlUtils(
                                            intl,
                                            erFremtidigOpphold
                                                ? 'valideringsfeil.utenlandsopphold.landDuSkalBoIPåkrevd'
                                                : 'valideringsfeil.utenlandsopphold.landDuHarBoddIPåkrevd',
                                        ),
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
