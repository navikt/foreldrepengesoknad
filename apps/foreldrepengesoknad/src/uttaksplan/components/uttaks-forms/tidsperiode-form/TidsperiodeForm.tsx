import React from 'react';
import { intlUtils, Tidsperiode, Block, TidsperiodeDate } from '@navikt/fp-common';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import { isUtsettelsesperiode, isUttaksperiode, Periode, Utsettelsesperiode } from 'uttaksplan/types/Periode';
import { andreAugust2022ReglerGjelder, dateRangeValidation, ISOStringToDate } from 'app/utils/dateUtils';
import {
    DatoAvgrensninger,
    getDatoavgrensningerForBareFarMedmorHarRettWLB,
    getDatoavgrensningerForFarMedmorPeriodeRundtFødselWLB,
    getDatoavgrensningerForStønadskonto,
} from 'uttaksplan/utils/datoAvgrensningerUtils';
import { mapTidsperiodeStringToTidsperiode } from 'uttaksplan/utils/periodeUtils';
import { getFørsteMuligeUttaksdag, getFørsteUttaksdagPåEllerEtterFødsel } from 'uttaksplan/utils/uttaksdatoerUtils';
import { isUttaksperiodeBareFarMedmorHarRett, isUttaksperiodeFarMedmorPgaFødsel } from 'app/utils/wlbUtils';
import { Situasjon } from 'app/types/Situasjon';
import { dateToISOString, getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { Button } from '@navikt/ds-react';

interface Props {
    periode?: Periode;
    tidsperiode: TidsperiodeDate;
    familiehendelsesdato: Date;
    ugyldigeTidsperioder: Tidsperiode[] | undefined;
    utsettelserIPlan: Utsettelsesperiode[];
    erFarEllerMedmor: boolean;
    morHarRett: boolean;
    onBekreft: (tidsperiode: Partial<Tidsperiode>) => void;
    onCancel?: () => void;
    initialMonth?: Date;
    termindato?: Date;
    situasjon: Situasjon;
    erFarMedmorOgHarAleneomsorg: boolean;
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
    erFarEllerMedmor: boolean,
    morHarRett: boolean,
    situasjon: Situasjon,
    erFarMedmorOgHarAleneomsorg: boolean
): DatoAvgrensninger => {
    if (periode && !isUtsettelsesperiode(periode)) {
        if (
            isUttaksperiodeFarMedmorPgaFødsel(periode, familiehendelsesdato, termindato) &&
            andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            situasjon === 'fødsel'
        ) {
            return getDatoavgrensningerForFarMedmorPeriodeRundtFødselWLB(
                familiehendelsesdato,
                termindato,
                ugyldigeTidsperioder
            );
        }
        if (
            isUttaksperiodeBareFarMedmorHarRett(periode, morHarRett) &&
            andreAugust2022ReglerGjelder(familiehendelsesdato) &&
            situasjon === 'fødsel'
        ) {
            return getDatoavgrensningerForBareFarMedmorHarRettWLB(
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

    const førsteMuligeUttaksdag = erFarMedmorOgHarAleneomsorg
        ? getFørsteUttaksdagPåEllerEtterFødsel(familiehendelsesdato)
        : getFørsteMuligeUttaksdag(familiehendelsesdato, erFarEllerMedmor, termindato);

    return {
        fra: {
            minDato: førsteMuligeUttaksdag,
            maksDato: tidsperiode
                ? ISOStringToDate(tom)!
                : dayjs(familiehendelsesdato).add(3, 'years').subtract(1, 'day').toDate(),
            ugyldigeTidsperioder,
            helgedagerIkkeTillatt: true,
        },
        til: {
            minDato: tidsperiode ? ISOStringToDate(fom)! : førsteMuligeUttaksdag,
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
    utsettelserIPlan,
    initialMonth,
    termindato,
    erFarEllerMedmor,
    morHarRett,
    situasjon,
    onBekreft,
    onCancel,
    erFarMedmorOgHarAleneomsorg,
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
                    erFarEllerMedmor,
                    morHarRett,
                    situasjon,
                    erFarMedmorOgHarAleneomsorg
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
                                            utsettelserIPlan: utsettelserIPlan,
                                            periodeId: periode !== undefined ? periode.id : undefined,
                                        }),
                                    dayPickerProps: {
                                        defaultMonth: initialMonth || familiehendelsesdato,
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
                                            utsettelserIPlan: utsettelserIPlan,
                                            periodeId: periode !== undefined ? periode.id : undefined,
                                        }),
                                    dayPickerProps: {
                                        defaultMonth: ISOStringToDate(values.fom),
                                    },
                                }}
                            />
                        </Block>
                        <Button type="submit">
                            <FormattedMessage id="uttaksplan.gåVidere" />
                        </Button>
                    </Form.Form>
                );
            }}
        />
    );
};

export default TidsperiodeForm;
