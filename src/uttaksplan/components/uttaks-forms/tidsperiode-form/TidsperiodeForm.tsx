import React from 'react';
import { intlUtils, Tidsperiode, Block, TidsperiodeDate } from '@navikt/fp-common';
import { getTypedFormComponents } from '@navikt/sif-common-formik/lib';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { isUtsettelsesperiode, isUttaksperiode, Periode } from 'uttaksplan/types/Periode';
import { dateRangeValidation, ISOStringToDate } from 'app/utils/dateUtils';
import { Knapp } from 'nav-frontend-knapper';
import { dateToISOString } from '@navikt/fp-common/node_modules/@navikt/sif-common-formik/lib';
import {
    DatoAvgrensninger,
    getDatoavgrensningerForFarMedmorPeriodeRundtFødsel,
    getDatoavgrensningerForStønadskonto,
} from 'uttaksplan/utils/datoAvgrensningerUtils';
import { mapTidsperiodeStringToTidsperiode } from 'uttaksplan/utils/periodeUtils';
import { getFørsteMuligeUttaksdag } from 'uttaksplan/utils/uttaksdatoerUtils';
import { isUttaksperiodeFarMedmorPgaFødsel } from 'app/utils/wlbUtils';

interface Props {
    periode?: Periode;
    tidsperiode: TidsperiodeDate;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[] | undefined;
    erFarEllerMedmor: boolean;
    onBekreft: (tidsperiode: Partial<Tidsperiode>) => void;
    onCancel?: () => void;
    initialMonth?: Date;
    termindato?: Date;
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
    ugyldigeTidsperioder: Tidsperiode[] | undefined,
    termindato: Date | undefined,
    erFarEllerMedmor: boolean
): DatoAvgrensninger => {
    if (periode && ugyldigeTidsperioder && !isUtsettelsesperiode(periode)) {
        if (isUttaksperiodeFarMedmorPgaFødsel(periode)) {
            return getDatoavgrensningerForFarMedmorPeriodeRundtFødsel(
                periode.tidsperiode,
                familiehendelsesdato,
                termindato,
                ugyldigeTidsperioder
            );
        }
        return getDatoavgrensningerForStønadskonto(
            isUttaksperiode(periode) ? periode.konto : undefined,
            familiehendelsesdato,
            mapTidsperiodeStringToTidsperiode({ fom, tom }),
            ugyldigeTidsperioder,
            erFarEllerMedmor,
            termindato
        );
    }

    return {
        fra: {
            minDato: getFørsteMuligeUttaksdag(familiehendelsesdato, erFarEllerMedmor, termindato),
            maksDato: tidsperiode
                ? ISOStringToDate(tom)!
                : dayjs(familiehendelsesdato).add(3, 'years').subtract(1, 'day').toDate(),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: tidsperiode
                ? ISOStringToDate(fom)!
                : getFørsteMuligeUttaksdag(familiehendelsesdato, erFarEllerMedmor, termindato),
            maksDato: dayjs(familiehendelsesdato).add(3, 'years').subtract(1, 'day').toDate(),
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
    termindato,
    erFarEllerMedmor,
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
                    ugyldigeTidsperioder,
                    termindato,
                    erFarEllerMedmor
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
                                    minDate: datoAvgrensninger.fra.minDato,
                                    maxDate: datoAvgrensninger.fra.maksDato,
                                    validate: (value) =>
                                        dateRangeValidation.validateFromDateInRange({
                                            intl,
                                            date: ISOStringToDate(value),
                                            minDate: datoAvgrensninger.fra.minDato,
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
                                            minDate: datoAvgrensninger.til.minDato,
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
