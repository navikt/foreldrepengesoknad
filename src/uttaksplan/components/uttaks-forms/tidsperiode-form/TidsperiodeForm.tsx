import React from 'react';
import { intlUtils, Tidsperiode, Block, TidsperiodeDate } from '@navikt/fp-common';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { isUtsettelsesperiode, isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { dateRangeValidation, ISOStringToDate } from 'app/utils/dateUtils';
import { Knapp } from 'nav-frontend-knapper';
import { dateToISOString } from '@navikt/fp-common/node_modules/@navikt/sif-common-formik/lib';
import { DatoAvgrensninger, getDatoavgrensningerForStønadskonto } from 'uttaksplan/utils/datoAvgrensningerUtils';
import { mapTidsperiodeStringToTidsperiode } from 'uttaksplan/utils/periodeUtils';

interface Props {
    periode?: Periode;
    tidsperiode: TidsperiodeDate;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[] | undefined;
    onBekreft: (tidsperiode: Partial<Tidsperiode>) => void;
    onCancel?: () => void;
    initialMonth?: Date;
}

enum TidsperiodeFormFields {
    fom = 'fom',
    tom = 'tom',
}

export type TidsperiodeFormValues = Partial<Tidsperiode>;

const Form = getTypedFormComponents<TidsperiodeFormFields, TidsperiodeFormValues>();

const getDatoAvgrensninger = (
    periode: Periode | undefined,
    familiehendelsesdato: Date,
    fom: string | undefined,
    tom: string | undefined,
    tidsperiode: Partial<TidsperiodeDate>,
    ugyldigeTidsperioder: Tidsperiode[] | undefined
): DatoAvgrensninger => {
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
            maksDato: tidsperiode ? ISOStringToDate(tom)! : dayjs(familiehendelsesdato).add(3, 'years').toDate(),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: tidsperiode ? ISOStringToDate(fom)! : familiehendelsesdato,
            maksDato: dayjs(familiehendelsesdato).add(3, 'years').toDate(),
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
            initialValues={{ fom: dateToISOString(tidsperiode.fom), tom: dateToISOString(tidsperiode.tom) }}
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
                    <Form.Form onCancel={onCancel} includeButtons={false}>
                        <Block>
                            <Form.DateIntervalPicker
                                legend={intlUtils(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tidsrom')}
                                fromDatepickerProps={{
                                    name: TidsperiodeFormFields.fom,
                                    disableWeekend: true,
                                    label: intlUtils(intl, 'utenlandsopphold.leggTilUtenlandsopphold.fraogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate: familiehendelsesdato,
                                    maxDate: ISOStringToDate(values.tom) || datoAvgrensninger.fra.maksDato,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDateInRange({
                                            intl,
                                            date: ISOStringToDate(value),
                                            minDate: familiehendelsesdato,
                                            maxDate: datoAvgrensninger.fra.maksDato,
                                            errorKey: 'valideringsfeil.fraOgMedDato.førTilDato',
                                            toDate: ISOStringToDate(values.tom),
                                            disableWeekend: datoAvgrensninger.fra.helgedagerIkkeTillatt,
                                        }),
                                    dayPickerProps: {
                                        initialMonth: initialMonth || familiehendelsesdato,
                                    },
                                }}
                                toDatepickerProps={{
                                    name: TidsperiodeFormFields.tom,
                                    disableWeekend: true,
                                    label: intlUtils(intl, 'utenlandsopphold.leggTilUtenlandsopphold.tilogmed'),
                                    fullscreenOverlay: true,
                                    placeholder: 'dd.mm.åååå',
                                    minDate: ISOStringToDate(values.fom) || familiehendelsesdato,
                                    maxDate: datoAvgrensninger.til.maksDato,
                                    validate: (value) =>
                                        dateRangeValidation.validateToDateInRange({
                                            intl,
                                            date: ISOStringToDate(value),
                                            minDate: familiehendelsesdato,
                                            maxDate: datoAvgrensninger.til.maksDato,
                                            errorKey: 'valideringsfeil.tilOgMedDato.etterFraDato',
                                            fromDate: ISOStringToDate(values.fom),
                                            disableWeekend: datoAvgrensninger.til.helgedagerIkkeTillatt,
                                        }),
                                    dayPickerProps: {
                                        initialMonth: ISOStringToDate(values.fom),
                                    },
                                }}
                            />
                        </Block>
                        <Knapp type="hoved">
                            <FormattedMessage id="uttaksplan.gåVidere" />
                        </Knapp>
                    </Form.Form>
                );
            }}
        />
    );
};

export default TidsperiodeForm;
