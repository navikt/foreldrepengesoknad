import { getTypedFormComponents, ISOStringToDate } from '@navikt/sif-common-formik/lib';
import { commonFieldErrorRenderer } from 'app/validation/fieldValidations';
import { Tidsperiode, TidsperiodeString } from 'common/types';
import React from 'react';
import moment from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import { dateRangeValidation } from 'app/util/dates/dates';
import { getDatoavgrensningerForStønadskonto } from 'app/util/uttaksplan/uttaksperiodeUtils';
import { isUtsettelsesperiode, isUttaksperiode } from 'app/types/uttaksplan/periodetyper';
import { mapTidsperiodeStringToTidsperiode } from 'app/util/tidsperiodeUtils';
import { UttakFormPeriodeType } from '../uttakForm/UttakForm';
import { Knapp } from 'nav-frontend-knapper';

interface Props {
    periode?: UttakFormPeriodeType;
    tidsperiode: Partial<TidsperiodeString>;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[] | undefined;
    onBekreft: (tidsperiode: Partial<TidsperiodeString>) => void;
    onCancel?: () => void;
    initialMonth?: Date;
}

enum TidsperiodeFormFields {
    fom = 'fom',
    tom = 'tom',
}

export type TidsperiodeFormValues = Partial<TidsperiodeString>;

const Form = getTypedFormComponents<TidsperiodeFormFields, TidsperiodeFormValues>();

const getDatoAvgrensninger = (
    periode: UttakFormPeriodeType | undefined,
    familiehendelsesdato: Date,
    fom: string | undefined,
    tom: string | undefined,
    tidsperiode: Partial<TidsperiodeString>,
    ugyldigeTidsperioder: Tidsperiode[] | undefined
) => {
    if (periode && ugyldigeTidsperioder && !isUtsettelsesperiode(periode)) {
        return getDatoavgrensningerForStønadskonto(
            isUttaksperiode(periode) ? periode.konto : undefined,
            familiehendelsesdato,
            mapTidsperiodeStringToTidsperiode({ fom, tom }),
            ugyldigeTidsperioder
        );
    }

    return {
        fra: {
            minDato: familiehendelsesdato,
            maksDato: tidsperiode ? ISOStringToDate(tom) : undefined,
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: tidsperiode ? ISOStringToDate(fom) : undefined,
            maksDato: moment(familiehendelsesdato).add(3, 'years').toDate(),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
    };
};

const TidsperiodeForm: React.FunctionComponent<Props> = ({
    periode,
    tidsperiode,
    familiehendelsesdato,
    ugyldigeTidsperioder,
    initialMonth,
    onBekreft,
    onCancel,
}) => {
    const intl = useIntl();

    return (
        <Form.FormikWrapper
            initialValues={{ fom: tidsperiode.fom, tom: tidsperiode.tom }}
            onSubmit={onBekreft}
            enableReinitialize={true}
            renderForm={({ values }) => {
                const datoAvgrensninger = getDatoAvgrensninger(
                    periode,
                    familiehendelsesdato,
                    values.fom,
                    values.tom,
                    tidsperiode,
                    ugyldigeTidsperioder
                );

                return (
                    <Form.Form
                        fieldErrorRenderer={(error) => commonFieldErrorRenderer(intl, error)}
                        onCancel={onCancel}
                        includeButtons={false}
                    >
                        <Block margin="xxs">
                            <Form.DateIntervalPicker
                                legend="Tidsrom"
                                fromDatepickerProps={{
                                    name: TidsperiodeFormFields.fom,
                                    label: getMessage(intl, 'fraogmed'),
                                    placeholder: 'dd.mm.åååå',
                                    fullscreenOverlay: true,
                                    minDate: datoAvgrensninger.fra.minDato,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                    maxDate: ISOStringToDate(values.tom) || datoAvgrensninger.fra.maksDato,
                                    disableWeekend: datoAvgrensninger.fra.helgedagerIkkeTillatt,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDateUttak(
                                            ISOStringToDate(value),
                                            datoAvgrensninger.fra.minDato!,
                                            datoAvgrensninger.fra.maksDato!,
                                            ISOStringToDate(values.tom)
                                        ),
                                    dayPickerProps: {
                                        initialMonth: initialMonth || familiehendelsesdato,
                                    },
                                }}
                                toDatepickerProps={{
                                    name: TidsperiodeFormFields.tom,
                                    label: getMessage(intl, 'tilogmed'),
                                    placeholder: 'dd.mm.åååå',
                                    fullscreenOverlay: true,
                                    minDate: ISOStringToDate(values.fom) || datoAvgrensninger.til.minDato,
                                    maxDate: datoAvgrensninger.til.maksDato,
                                    invalidFormatErrorKey: 'valideringsfeil.ugyldigDato',
                                    disableWeekend: datoAvgrensninger.fra.helgedagerIkkeTillatt,
                                    validate: (value) =>
                                        dateRangeValidation.validateToDateUttak(
                                            ISOStringToDate(value),
                                            datoAvgrensninger.til.minDato!,
                                            datoAvgrensninger.til.maksDato!,
                                            ISOStringToDate(values.fom)
                                        ),
                                    dayPickerProps: {
                                        initialMonth: ISOStringToDate(values.fom),
                                    },
                                }}
                            />
                        </Block>
                        <Knapp type="hoved">
                            <FormattedMessage id="gåVidere" />
                        </Knapp>
                    </Form.Form>
                );
            }}
        />
    );
};

export default TidsperiodeForm;
